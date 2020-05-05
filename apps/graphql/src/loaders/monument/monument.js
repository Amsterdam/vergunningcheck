const debug = require("debug")("graphql:loaders:monument");
const { withCache, fetchJson, getUrl } = require("../../util");
const {
  monument: config,
  CACHE_TIMEOUT,
  HOST,
} = require("config").loaders.datapunt;
const TTL = config.cacheTimeout || CACHE_TIMEOUT;
const URL = `${HOST}${config.url}`;

let loader = {
  reducer: ({ monumentstatus }) => {
    if (!monumentstatus) {
      throw new Error("Monument status not found!");
    }
    return {
      _type: "Monument",
      name: monumentstatus,
      type:
        monumentstatus === "Rijksmonument"
          ? "NATIONAL_MONUMENT"
          : "MUNICIPAL_MONUMENT",
    };
  },
  load: (id) => {
    return fetchJson(getUrl(`${URL}monumenten/${id}`)).then(loader.reducer);
  },
  cached: (key) =>
    withCache(`momument:monument:${key}`, () => loader.load(key), TTL),
};

module.exports = {
  load: async (keys) => keys.map(loader.cached),
};
