const graphqlHTTP = require("express-graphql");
const DataLoader = require("dataloader");
const { makeExecutableSchema } = require("graphql-tools");
const { graphql: config } = require("config");
const depthLimit = require("graphql-depth-limit");

const bagSearch = require("../loaders/bagSearch");
const bag = require("../loaders/bag");
const monument = require("../loaders/monument");
const geoSearch = require("../loaders/geoSearch");
const zoningPlan = require("../loaders/zoningPlan");

const modules = [
  require("./node"),
  require("./address"),
  require("./monument"),
  require("./cityScape"),
  require("./restriction"),
  require("./zoningPlan"),
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
      bagSearch: new DataLoader(bagSearch.load),
      bag: {
        building: new DataLoader(bag.building.load),
        accommodation: new DataLoader(bag.accommodation.load),
        berth: new DataLoader(bag.berth.load),
      },
      zoningPlan: new DataLoader(zoningPlan.load),
      geoSearch: new DataLoader(geoSearch.load),
      monument: {
        situation: new DataLoader(monument.situation.load),
        monument: new DataLoader(monument.monument.load),
      },
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
