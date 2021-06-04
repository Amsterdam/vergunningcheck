const debug = require("debug")("graphql:loader:manager");
const { fetchJson, getUrl } = require("../../util");
const { manager: config, HOST } = require("../../../config").loaders.ois;

const URL = `${HOST}${config.url}`;

const loader = {
  reducer: ({ slug, name, heading, intro, outcomes, flow, permits }) => ({
    name,
    slug,
    permits,
    hasIMTR: flow === "IMTR",
    intro,
    outcomes: outcomes.map((o) => ({
      results: o.flo_legal_outcomes.split(","),
      text: o.text,
    })),
    text: {
      heading,
    },
  }),
  fetchPage: () =>
    fetchJson(getUrl(`${URL}topics/`)).then((data) => {
      debug("fetched topics", data.results);
      return data.results.map(loader.reducer);
    }),

  fetch: (id) =>
    fetchJson(getUrl(`${URL}topics/${id}/`)).then((data) => {
      debug("fetched topic", data);
      return loader.reducer(data);
    }),
  // we don't cache api calls to manager
  list: async (keys) => keys.map(loader.fetchPage),
  load: async (keys) => keys.map(loader.fetch),
};

module.exports = loader;
