const { withCache, fetchJson, getUrl } = require("../../util");
const {
  geoSearch: config,
  CACHE_TIMEOUT,
  HOST,
} = require("config").loaders.datapunt;
const TTL = config.cacheTimeout || CACHE_TIMEOUT;
const URL = `${HOST}${config.url}`;

const accepted = ["kernzone", "bufferzone"];
const loader = {
  reducer: (o) => ({
    _type: "CityScape",
    name: o.properties.display,
  }),
  load: (key) => {
    const [x, y] = key.split(" ");
    return fetchJson(
      getUrl(`${URL}search/`, { item: "unesco", x, y })
    ).then((data) =>
      data.features
        .filter(({ properties: { id } }) => accepted.includes(id))
        .map(loader.reducer)
    );
  },
  cached: (key) => withCache(`geoSearch:${key}`, () => loader.load(key), TTL),
};

module.exports = {
  load: async (keys) => keys.map(loader.cached),
};
