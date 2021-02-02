const debug = require("debug")("graphql:loaders:tree");
const geojsonArea = require("@mapbox/geojson-area");
const db = require("../../database");

const maxAreaMetersSquared = 10000;
const sridRD = 28992;
const sridLatLon = 4326;
const limit = 300;
const table = "grn_vegetatieobject";
const fieldMap = {
  id: "bk_grn_vegetatieobject",
  geometry: `ST_AsGeoJSON(ST_FlipCoordinates(ST_Transform(geometrie, ${sridLatLon})))`,
};

const fields = Object.entries(fieldMap)
  .map(([fieldName, q]) => `${q} as ${fieldName}`)
  .join(", ");

const loader = {
  reducer: (o) => ({
    ...o,
    geometry: JSON.parse(o.geometry),
  }),
  fetch: (ids) => {
    if (ids.length > limit) {
      return new Error(`Request size too large. Please limit to ${limit}`);
    }
    return db.query(
      `SELECT ${fields} FROM ${table}
       WHERE ${fieldMap.id} = ANY($1)
       ORDER BY ${fieldMap.id} ASC -- rows are 'out of order' without an ORDER here
      `,
      [ids],
      loader.reducer
    );
  },
  search: async (geojson) => {
    if (geojsonArea.geometry(geojson) > maxAreaMetersSquared) {
      return new Error("Search area too big. Please zoom in.");
    }

    const result = await db.query(
      `SELECT ${fields} FROM ${table}
       WHERE geometrie && ST_Transform(ST_SetSRID(ST_GeomFromGeoJSON($1), ${sridLatLon}), ${sridRD})
       ORDER BY ${fieldMap.id} ASC -- rows are 'out of order' without an ORDER here
       LIMIT ${limit}`,
      [JSON.stringify(geojson)],
      loader.reducer
    );

    if (result.length >= limit) {
      debug(
        `Dropping trees. The number of trees (${result.length}) >= to limit ${limit}. Returning only the first ${limit}.`
      );
    }
    return result;
  },
};

module.exports = loader;