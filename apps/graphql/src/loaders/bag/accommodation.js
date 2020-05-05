const { withCache, fetchJson, getUrl } = require("../../util");
const { bag: config, CACHE_TIMEOUT, HOST } = require("config").loaders.datapunt;
const TTL = config.cacheTimeout || CACHE_TIMEOUT;

const loader = {
  reducer: (o) => ({
    lat: o.geometrie.coordinates[0],
    lon: o.geometrie.coordinates[1],
    mainAddressNationalId: o.hoofdadres.landelijk_id,
  }),
  load: (id) =>
    fetchJson(`${HOST}${config.url}verblijfsobject/${id}/`).then(
      loader.reducer
      // .then(a =>
      // 	a.geometrie ? accommodation.reducer(a) : null
      // )
    ),
  cached: (key) =>
    withCache(`bag:accommodation:${key}`, () => loader.load(key), TTL),
};

module.exports = {
  load: async (keys) => keys.map(loader.cached),
};
