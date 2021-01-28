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
    tree(id: ID!): Tree
    trees(search: GeoSearchInput): [Tree!]!
  }
`;

const resolvers = {
  Query: {
    tree: (_, { id }, { loaders }) => loaders.tree.fetch(id),
    trees: (_, { search }, { loaders }) => loaders.tree.search(search),
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
