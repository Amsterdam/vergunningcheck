const { withCache, fetchJson, getUrl } = require("../../util");
const {
  bag: config,
  CACHE_TIMEOUT,
  HOST,
} = require("../../../config").loaders.datapunt;

const TTL = config.cacheTimeout || CACHE_TIMEOUT;
const URL = `${HOST}${config.url}`;

const loader = {
  reducer: ({ _display }) => ({
    _display,
  }),
  fetch: (id) =>
    fetchJson(getUrl(`${URL}ligplaats/${id}/`)).then(loader.reducer),
  cached: (key) => withCache(`bag:berth:${key}`, () => loader.fetch(key), TTL),
  load: async (keys) => keys.map(loader.cached),
};

module.exports = loader;
