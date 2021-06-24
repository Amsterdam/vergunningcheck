const debug = require("debug")("graphql:loader:manager");
const { fetchJson, getUrl } = require("../../util");
const { manager: config, HOST } = require("../../../config").loaders.ois;

const URL = `${HOST}${config.url}`;

const loader = {
  reducer: (topic) => ({
      name: topic.name,
      slug: topic.slug,
      permits: topic.permits,
      hasIMTR: topic.flow === "IMTR",
      outcomes: topic.outcomes.map((outcome) => ({
        results: outcome.flo_legal_outcomes.split(","),
        text: outcome.text,
      })),
      text: {
        heading: topic.heading,
        intro: topic.intro,
        locationIntro: topic.location_intro,
      },
      userMightNotNeedPermit: topic.user_might_not_need_permit,
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
