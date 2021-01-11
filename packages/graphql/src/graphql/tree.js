const uniqBy = require("lodash/uniqBy");
const debug = require("debug")("graphql:address");
const { GraphQLError } = require("graphql");
const { gql } = require("../util");

let typeDefs = gql`
  # type Geo {
  #   type: String
  #   features {
  #     type
  #     geometry {
  #       type
  #       coordinates
  #     }
  #     properties {
  #       id
  #     }
  #   }
  # }

  type Tree implements Node {
    id: ID!
    # meta: {
    #   monument: MonumentTree!
    # }
    # geo: Geo
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
