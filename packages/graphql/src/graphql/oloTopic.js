const debug = require("debug")("graphql:topics");

const { gql } = require("../util");

const typeDefs = gql`
  type OLOTopic {
    name: String!
    slug: String!
    redirect: Boolean!
  }

  extend type Query {
    oloTopics: [OLOTopic!]!
    oloTopic(slug: String): OLOTopic
  }
`;

const resolvers = {
  Query: {
    oloTopic: (_, { slug }, { loaders: { manager } }) => {
      debug("find topic", slug);
      return manager.load([slug]);
    },
    oloTopics: async (_, __, { loaders: { managerList } }) => {
      const result = await managerList.load(1);
      debug("find topics", result);
      return result;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
