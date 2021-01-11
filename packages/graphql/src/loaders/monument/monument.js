const { withCache, fetchJson, getUrl } = require("../../util");
const {
  monument: config,
  CACHE_TIMEOUT,
  HOST,
} = require("../../../config").resources.datapuntApi;

const TTL = config.cacheTimeout || CACHE_TIMEOUT;
const URL = `${HOST}${config.url}`;

const loader = {
  reducer: ({ monumentstatus }) => {
    if (!monumentstatus) {
      throw new Error("Monument status not found!");
    }
    return {
      _type: "Monument",
      name: monumentstatus,
      scope: monumentstatus === "Rijksmonument" ? "NATIONAL" : "MUNICIPAL",
      type:
        monumentstatus === "Rijksmonument"
          ? "NATIONAL_MONUMENT"
          : "MUNICIPAL_MONUMENT",
    };
  },
  fetch: (key) =>
    fetchJson(getUrl(`${URL}monumenten/${key}/`)).then(loader.reducer),
  cached: (key) =>
    withCache(`momument:monument:${key}`, () => loader.fetch(key), TTL),
  load: async (keys) => keys.map(loader.cached),
};

module.exports = loader;
