const { withCache, fetchJson, getUrl } = require("../../util");
const { bag: config, CACHE_TIMEOUT, HOST } = require("config").loaders.datapunt;
const TTL = config.cacheTimeout || CACHE_TIMEOUT;
const URL = `${HOST}${config.url}`;

const loader = {
  reducer: (o) => ({
    // nationalId: o.landelijk_id
  }),
  load: (id) =>
    fetchJson(getUrl(`${URL}ligplaats/${id}/`)).then(
      (data) => data.results.map(loader.reducer)[0]
    ),
  cached: (key) => withCache(`bag:berth:${key}`, () => loader.load(key), TTL),
};

module.exports = {
  load: async (keys) => keys.map(loader.cached),
};
