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
  type TopicText {
    heading: String!
    locationIntro: String
  }
  type Outcomes {
    floLegalOutcomes: [String]
    text: String
  }

  type Topic {
    name: String!
    slug: String!
    intro: String!
    hasIMTR: Boolean!
    text: TopicText!
    url: String!
    outcomes: [Outcomes!]!
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
