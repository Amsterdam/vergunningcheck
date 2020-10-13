const { gql } = require("../util");
var { GraphQLError } = require("graphql");

const typeDefs = gql`
  interface Node {
    id: ID!
  }
`;

const resolvers = {
  Node: {
    id: ({ id }) => Buffer.from(id).toString("base64"),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
