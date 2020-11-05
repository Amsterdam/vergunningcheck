const { gql } = require("../util");

const typeDefs = gql`
  extend type Address {
    districtName: String!
    neighborhoodName: String!
  }
`;

const resolve = (args, area, one) => {
  console.log(area);
};

const resolvers = {
  Address: {
    neighborhoodName: (args, _, { loaders }) => resolve(args, loaders),

    // districtName: (parent, args, context, info) => {
    //
    // },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
