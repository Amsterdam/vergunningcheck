const { gql } = require("../util");

const typeDefs = gql`
  interface Node {
    id: ID!
  }
  type Query {
    version: String!
  }
`;

const resolvers = {
  Query: {
    version: () => process.env.npm_package_version,
  },
  Node: {
    id: ({ id }) => Buffer.from(id).toString("base64"),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
