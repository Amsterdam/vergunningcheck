const { withCache, fetchJson } = require("../../util");
const {
  bag: config,
  CACHE_TIMEOUT,
  HOST,
} = require("../../../config").resources.amsterdam.api;

const TTL = config.cacheTimeout || CACHE_TIMEOUT;

const loader = {
  reducer: (o) => ({
    lat: o.geometrie.coordinates[0],
    lon: o.geometrie.coordinates[1],
    mainAddressNationalId: o.hoofdadres.landelijk_id,
    neighborhoodName: o.buurt.naam,
    districtName: o._buurtcombinatie.naam,
  }),
  fetch: (id) =>
    fetchJson(`${HOST}${config.url}verblijfsobject/${id}/`).then(
      loader.reducer
      // .then(a =>
      // 	a.geometrie ? accommodation.reducer(a) : null
      // )
    ),
  cached: (key) =>
    withCache(`bag:accommodation:${key}`, () => loader.fetch(key), TTL),
  load: async (keys) => keys.map(loader.cached),
};

module.exports = loader;
