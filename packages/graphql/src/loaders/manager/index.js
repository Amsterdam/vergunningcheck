const debug = require("debug")("graphql:loader:manager");
const { withCache, fetchJson, getUrl } = require("../../util");
const {
  manager: config,
  CACHE_TIMEOUT,
  HOST,
} = require("../../../config").loaders.ois;

const TTL = config.cacheTimeout || CACHE_TIMEOUT;
const URL = `${HOST}${config.url}`;

const loader = {
  reducer: ({ heading, intro, flow, outcomes, ...rest }) => {
    const res = {
      ...rest,
      hasIMTR: flow === "IMTR",
      intro,
      outcomes: outcomes.map((outcome) => ({
          floLegalOutcomes: outcome && outcome.flo_legal_outcomes.split(','),
          text: outcome.text || ""
        })
      ),
      text: {
        heading,
      },
    };
    console.log({ res });
    return res;
  },
  fetchPage: () =>
    fetchJson(getUrl(`${URL}topics/`)).then((data) => {
      debug("fetched topics", data.results);
      return data.results.map(loader.reducer);
    }),

  fetch: (id) =>
    fetchJson(getUrl(`${URL}topics/${id}`)).then((data) => {
      debug("fetched topic", data);
      return loader.reducer(data);
    }),
  cached: (key) => withCache(`manager:${key}`, () => loader.fetch(key), TTL),
  page: () => withCache(`manager:list`, () => loader.fetchPage(), TTL), // @TODO cursor pagination
  list: async (keys) => keys.map(loader.page),
  load: async (keys) => keys.map(loader.cached),
};

module.exports = loader;
