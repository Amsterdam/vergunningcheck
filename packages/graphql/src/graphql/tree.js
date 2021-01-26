const { gql } = require("../util");

/**
 * TODO extend GraphQL schema with geolocation.
 *
 * ```
 * type Geo {
 *   type: String
 *   features {
 *     type
 *     geometry {
 *       type
 *       coordinates
 *     }
 *     properties {
 *       id
 *     }
 *   }
 * }
 *
 * type Tree implements Node {
 *   meta: {
 *     monument: MonumentTree!
 *   }
 *   geo: Geo
 * }
 * ```
 */

const typeDefs = gql`
  type Tree implements Node {
    id: ID!
  }

  extend type Query {
    tree(id: ID!): Tree
    trees: [Tree!]!
  }
`;

const resolvers = {
  Query: {
    tree: (_, args) => args,
    trees: (_, __, { loaders }) => loaders.tree.fetch(),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
