const { withCache, fetchJson, getUrl } = require("../../util");
const {
  monument: config,
  CACHE_TIMEOUT,
  HOST,
} = require("config").loaders.datapunt;
const TTL = config.cacheTimeout || CACHE_TIMEOUT;

let loader = {
  reducer: ({ hoort_bij_monument }) => {
    if (!hoort_bij_monument) {
      throw new Error("hoort_bij_monument not found!");
    }
    return {
      monumentId: hoort_bij_monument.identificerende_sleutel_monument,
    };
  },
  load: (id) =>
    fetchJson(
      getUrl(`${HOST}${config.url}situeringen/`, {
        betreft_nummeraanduiding: id,
      })
    ).then((data) => data.results.map(loader.reducer)),
  cached: (key) =>
    withCache(`momument:situation:${key}`, () => loader.load(key), TTL),
};

module.exports = {
  load: async (keys) => keys.map(loader.cached),
};
