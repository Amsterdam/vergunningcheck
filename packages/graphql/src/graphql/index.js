const { graphqlHTTP } = require("express-graphql");
const DataLoader = require("dataloader");
const { makeExecutableSchema } = require("apollo-server");
const depthLimit = require("graphql-depth-limit");
const { graphql: config } = require("../../config");

const bagSearchLoader = require("../loaders/bagSearch");
const bagLoader = require("../loaders/bag");
const monumentLoader = require("../loaders/monument");
const geoSearchLoader = require("../loaders/geoSearch");
const zoningPlanLoader = require("../loaders/zoningPlan");
const treeLoader = require("../loaders/tree");

const address = require("./address");
const area = require("./area");
const cityScape = require("./cityScape");
const monument = require("./monument");
const node = require("./node");
const restriction = require("./restriction");
const tree = require("./tree");
const zoningPlan = require("./zoningPlan");

const modules = [
  address,
  area,
  cityScape,
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

// const server = graphqlHTTP((request, response, graphQLParams) => ({
const server = graphqlHTTP({
  ...config,
  schema,
  validationRules: [depthLimit(3)],
  context: {
    // request,
    loaders: {
      bagSearch: new DataLoader(bagSearchLoader.load),
      bag: {
        accommodation: new DataLoader(bagLoader.accommodation.load),
      },
      geoSearch: new DataLoader(geoSearchLoader.load),
      monument: {
        situation: new DataLoader(monumentLoader.situation.load),
        monument: new DataLoader(monumentLoader.monument.load),
      },
      tree: treeLoader,
      zoningPlan: new DataLoader(zoningPlanLoader.load),
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
