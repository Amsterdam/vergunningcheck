const { graphqlHTTP } = require("express-graphql");
const DataLoader = require("dataloader");
const { makeExecutableSchema } = require("apollo-server");
const depthLimit = require("graphql-depth-limit");
const { graphql: config } = require("../../config");

const bagSearchLoader = require("../loaders/bagSearch");
const bagLoader = require("../loaders/bag");
const managerLoader = require("../loaders/manager");
const monumentLoader = require("../loaders/monument");
const geoSearchLoader = require("../loaders/geoSearch");
const zoningPlanLoader = require("../loaders/zoningPlan");

const address = require("./address");
const area = require("./area");
const cityScape = require("./cityScape");
const monument = require("./monument");
const node = require("./node");
const restriction = require("./restriction");
const topic = require("./topic");
const zoningPlan = require("./zoningPlan");

const modules = [
  address,
  area,
  cityScape,
  monument,
  node,
  restriction,
  topic,
  zoningPlan,
];

const schema = makeExecutableSchema({
  typeDefs: modules.map((m) => m.typeDefs),
  resolvers: modules.map((m) => m.resolvers),
});

const server = graphqlHTTP({
  ...config,
  schema,
  validationRules: [depthLimit(4)],
  context: {
    loaders: {
      bagSearch: new DataLoader(bagSearchLoader.load),
      bag: {
        accommodation: new DataLoader(bagLoader.accommodation.load),
      },
      geoSearch: new DataLoader(geoSearchLoader.load),
      manager: new DataLoader(managerLoader.load),
      managerList: new DataLoader(managerLoader.list),
      monument: {
        situation: new DataLoader(monumentLoader.situation.load),
        monument: new DataLoader(monumentLoader.monument.load),
      },
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
