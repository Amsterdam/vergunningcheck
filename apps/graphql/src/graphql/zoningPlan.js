const debug = require("debug")("graphql:zoningPlan");
const { gql } = require("../util");

const typeDefs = gql`
  type zoningPlan {
    name: String!
  }
  extend type Address {
    zoningPlans: [zoningPlan]!
  }
`;

const resolvers = {
  Address: {
    zoningPlans: (
      { _adressableObjectId },
      args,
      { loaders: { bag, zoningPlan } }
    ) =>
      bag.accommodation.load(_adressableObjectId).then(({ lat, lon }) => {
        debug(
          `found ${lat} ${lon} from bag.accommodation, now fetch zoningPlans`
        );
        return zoningPlan.load(`${lat} ${lon}`);
      }),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
