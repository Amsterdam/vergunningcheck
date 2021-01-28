const { query } = require("../../database");

const sridRD = 28992;
const sridLatLon = 4326;
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
  fetch: (id) =>
    query(
      `SELECT ${fields} FROM ${table}
       WHERE ${fieldMap.id} = $1
       LIMIT 1;`,
      [id],
      loader.reducer,
      false
    ),
  search: async (geojson) =>
    query(
      `SELECT ${fields} FROM ${table}
       WHERE geometrie && ST_Transform(ST_SetSRID(ST_GeomFromGeoJSON($1), ${sridLatLon}), ${sridRD})
       LIMIT 500`,
      [JSON.stringify(geojson)],
      loader.reducer
    ),
};

module.exports = loader;
