const { gql } = require("../util");

const typeDefs = gql`
  type Tree implements Node {
    id: ID!
    meta: TreeMeta!
    geometry: GeoJSONPoint!
  }

  type TreeMeta {
    isProtected: Boolean!
  }

  extend type Query {
    trees(ids: [ID!], search: GeoSearchInput): [Tree!]!
  }
`;

const resolvers = {
  Query: {
    trees: (_, { search, ids }, { loaders }) =>
      ids ? loaders.tree.fetch(ids) : loaders.tree.search(search),
  },
  Tree: {
    meta: () => ({}),
  },
  TreeMeta: {
    isProtected: () => Math.random() < 0.5, // rand bool
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
