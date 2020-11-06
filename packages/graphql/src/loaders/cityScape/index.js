const { withCache, fetchJson, getUrl } = require("../../util");
const {
  cityScape: config,
  CACHE_TIMEOUT,
  HOST,
} = require("../../../config").loaders.datapunt;

const TTL = config.cacheTimeout || CACHE_TIMEOUT;
const URL = `${HOST}${config.url}`;
const fields = ["status"];

const scopeMap = {
  "Gemeentelijk beschermd stads- of dorpsgezicht": "MUNICIPAL",
  rijksmonument: "NATIONAL",
};

const loader = {
  reducer: (o) => ({
    scope: scopeMap[o.status],
  }),
  fetch: (id) => {
    return fetchJson(getUrl(`${URL}${id}/`, { fields })).then(loader.reducer);
  },
  cached: (id) => withCache(`cityScape:${id}`, () => loader.fetch(id), TTL),
  load: async (keys) => keys.map(loader.cached),
};

module.exports = loader;
