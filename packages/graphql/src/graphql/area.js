const { gql } = require("../util");

let typeDefs = gql`
  extend type Address {
    districtName: String!
    neighborhoodName: String!
  }
`;

const resolve = (args, bagSearch, one) => {};

const resolvers = {
  Address: {
    neighborhoodName: ({ parent }, args, { loaders }) => {
      // loaders.bag.accomodation....
    },
    // districtName: (parent, args, context, info) => {

    // },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
