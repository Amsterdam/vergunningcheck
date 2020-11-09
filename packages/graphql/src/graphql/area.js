const { gql } = require("../util");

const typeDefs = gql`
  extend type Address {
    districtName: String!
    neighborhoodName: String!
  }
`;

// Get a resolver for a specific field of accomodation
const getResolver = (field) => async (
  { _adressableObjectId },
  _,
  { loaders }
) => (await loaders.bag.accommodation.load(_adressableObjectId))[field];

const resolvers = {
  Address: {
    neighborhoodName: getResolver("neighborhoodName"),
    districtName: getResolver("districtName"),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
