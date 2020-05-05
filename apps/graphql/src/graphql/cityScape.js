const { gql } = require("../util");

const typeDefs = gql`
  type CityScape {
    name: String!
  }
`;

const resolvers = {};

module.exports = {
  typeDefs,
  resolvers,
};
