const { gql } = require("../util");

const typeDefs = gql`
  type Tree implements Node {
    id: ID!
    meta: TreeMeta!
    geo: GeoJSONPoint!
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
    tree: (_, args) => ({
      meta: {},
      ...args,
    }),
    trees: async (_, { search }, { loaders }) => {
      return (await loaders.tree.fetch(search)).map((data) => ({
        meta: {},
        geo: {
          type: "POINT",
          features: [
            {
              type: "POINT",
              crs: {
                type: "NAME",
                properties: {
                  name: "the name",
                },
              },
              bbox: [2.1],
            },
          ],
        },
        ...data,
      }));
    },
  },
  TreeMeta: {
    isProtected: () => Math.random() < 0.5, // rand bool
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
