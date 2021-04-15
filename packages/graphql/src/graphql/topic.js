const debug = require("debug")("graphql:topics");

const { gql } = require("../util");

const typeDefs = gql`
  type Question {
    title: String!
  }
  type Permit {
    questions: [Question]!
  }
  type Checker {
    permits: [Permit]!
  }

  type Topic {
    name: String!
    slug: String!
    intro: String
    flow: String!
    url: String!
    checker: Checker!
  }

  extend type Query {
    topics: [Topic]
    topic(slug: String): Topic
  }
`;

const resolvers = {
  Query: {
    topic: (_, { slug }, { loaders: { manager } }) => {
      debug("find topic", slug);
      return manager.load(slug);
    },
    topics: async (_, __, { loaders: { managerList } }) => {
      const result = await managerList.load(1);
      debug("find topics", result);
      return result;
    },
  },
  Topic: {
    checker: () => {
      return {
        permits: [{ questions: [{ title: "testing hard" }] }],
      };
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};