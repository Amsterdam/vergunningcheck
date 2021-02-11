const { graphqlHTTP } = require("express-graphql");
const DataLoader = require("dataloader");
const { makeExecutableSchema } = require("apollo-server");
const depthLimit = require("graphql-depth-limit");
const { graphql: config, cache } = require("../../config");

const bagSearchLoader = require("../loaders/bagSearch");
const bagLoader = require("../loaders/bag");
const monumentLoader = require("../loaders/monument");
const geoSearchLoader = require("../loaders/geoSearch");
const zoningPlanLoader = require("../loaders/zoningPlan");
const treeLoader = require("../loaders/tree");

const address = require("./address");
const area = require("./area");
const cityScape = require("./cityScape");
const geo = require("./geo");
const monument = require("./monument");
const node = require("./node");
const restriction = require("./restriction");
const tree = require("./tree");
const zoningPlan = require("./zoningPlan");

const modules = [
  address,
  area,
  cityScape,
  geo,
  monument,
  node,
  restriction,
  tree,
  zoningPlan,
];

const schema = makeExecutableSchema({
  typeDefs: modules.map((m) => m.typeDefs),
  resolvers: modules.map((m) => m.resolvers),
});

const dlConfig = { cache: cache.dataLoader.enabled };

const server = graphqlHTTP({
  ...config,
  schema,
  validationRules: [depthLimit(config.depthLimit)],
  context: {
    // request,
    loaders: {
      bagSearch: new DataLoader(bagSearchLoader.load, dlConfig),
      bag: {
        accommodation: new DataLoader(bagLoader.accommodation.load, dlConfig),
      },
      geoSearch: new DataLoader(geoSearchLoader.load, dlConfig),
      monument: {
        situation: new DataLoader(monumentLoader.situation.load, dlConfig),
        monument: new DataLoader(monumentLoader.monument.load, dlConfig),
      },
      tree: treeLoader,
      zoningPlan: new DataLoader(zoningPlanLoader.load, dlConfig),
    },
  },
  customFormatErrorFn: ({ stack, ...rest }) => ({
    stack: stack ? stack.split("\n") : [],
    ...rest,
  }),
});

module.exports = {
  schema,
  server,
};
