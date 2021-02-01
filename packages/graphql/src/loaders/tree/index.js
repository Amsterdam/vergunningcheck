const getPool = require("../../database");

// TODO: consider moving this file to a different folder as it is not related to
// the rest api loaders. Also the setup is different and it uses no caching.

/**
 * `SELECT *, ST_AsGeoJSON(ST_Transform(geometrie, 4326)) as geo FROM grn_vegetatieobject
        WHERE geometrie && ST_MakeEnvelope (
          103082.0, 486567.0, -- bounding
          103683.9, 486868.9, -- box limits
          4326
        )
        LIMIT 50`


        `SELECT *, ST_AsGeoJSON(ST_FlipCoordinates(ST_Transform(geometrie, ${sridLatLon}))) as geo
       FROM grn_vegetatieobject
       WHERE geometrie && ST_Transform(ST_MakeEnvelope(
         ${xmin}, ${ymin}, -- bounding
         ${xmax}, ${ymax}, -- box limits
         ${sridLatLon}
       ), ${sridRD})
       LIMIT 50`
 */
const loader = {
  reducer: (o) => {
    console.log(o);
    return {
      id: o.bk_grn_vegetatieobject,
      // o.tijdstipregistratie: '20120802073221',
      // o.lv_publicatiedatum: '20151229035805',
      // o.bronhouder: 'G0394',
      // o.relatievehoogteligging: '0',
      // o.plus_type: 'boom',
      geo: {
        ...JSON.parse(o.geo),
        // crs: {
        //   type: "NAME",
        //   properties: {
        //     name: "locatie ofzo?",
        //   },
        // },
      },
    };
  },
  fetch: async (query) => {
    const geojson = JSON.stringify(query);
    const pool = await getPool();
    // ST_Transform
    const sridRD = 28992;
    const sridLatLon = 4326;

    // const lonMax = 4.905888; // rechts
    // const latMax = 52.370821; // boven
    // const lonMin = 4.904454; // links
    // const latMin = 52.370305; // onder

    // const xmin = lonMin;
    // const ymin = latMin;
    // const xmax = lonMax;
    // const ymax = latMax;

    // const geojsonMain = {
    //   type: "Polygon",
    //   coordinates: [
    //     [
    //       [xmin, ymin], // linksonder
    //       [xmax, ymin], // rechtsonder
    //       [xmax, ymax], // rechtsboven
    //       [xmin, ymax], // linksboven
    //     ],
    //   ],
    // }
    // const geojsonExtended = {
    //   type: "Feature",
    //   geometry: {
    //     ...geojsonMain
    //   },
    // }

    // const geojson =
    //   '{"type":"Polygon","coordinates":[[[4.904454,52.370305],[4.905888,52.370305],[4.905888,52.370821],[4.904454,52.370821]]]}';
    // // const geojson = JSON.stringify();
    // console.log(geojson);
    const res = await pool.query(
      `SELECT *, ST_AsGeoJSON(ST_FlipCoordinates(ST_Transform(geometrie, ${sridLatLon}))) as geo
       FROM grn_vegetatieobject
       WHERE geometrie && ST_Transform(ST_SetSRID(ST_GeomFromGeoJSON('${geojson}'), ${sridLatLon}), ${sridRD})
       LIMIT 100
      `
    );
    return res.rows.map(loader.reducer);
  },
};

module.exports = loader;
