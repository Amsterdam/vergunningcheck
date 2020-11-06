const { withCache, fetchJson, getUrl } = require("../../util");
const {
  monument: config,
  CACHE_TIMEOUT,
  HOST,
} = require("../../../config").loaders.datapunt;

const TTL = config.cacheTimeout || CACHE_TIMEOUT;

const loader = {
  reducer: (obj) => {
    if (!obj.hoort_bij_monument) {
      throw new Error("hoort_bij_monument not found!");
    }
    return {
      monumentId: obj.hoort_bij_monument.identificerende_sleutel_monument,
    };
  },
  fetch: (id) =>
    fetchJson(
      getUrl(`${HOST}${config.url}situeringen/`, {
        betreft_nummeraanduiding: id,
      })
    ).then((data) => data.results.map(loader.reducer)),
  cached: (key) =>
    withCache(`momument:situation:${key}`, () => loader.fetch(key), TTL),
  load: async (keys) => keys.map(loader.cached),
};

module.exports = loader;
