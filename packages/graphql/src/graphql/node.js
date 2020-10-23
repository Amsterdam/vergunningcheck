const { gql } = require("../util");

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
