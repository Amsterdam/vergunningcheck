const { gql } = require("../util");

const typeDefs = gql`
  type CityScape {
    name: String!
    scope: Scope!
  }
`;

const resolvers = {};

module.exports = {
  typeDefs,
  resolvers,
};
