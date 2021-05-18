const debug = require("debug")("graphql:topics");

const transform = require("../loaders/floLegal/transform");
const { gql } = require("../util");

const typeDefs = gql`
  type TopicText {
    heading: String!
    locationIntro: String
  }

  type Topic {
    checkerJSON: String!
    hasIMTR: Boolean!
    intro: String!
    name: String!
    outcomes: [Outcome!]!
    slug: String!
    text: TopicText!
    url: String!
  }

  type Outcome {
    results: [String!]!
    text: String!
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
    checkerJSON: async (topic, _, { loaders: { floLegal } }) => {
      debug("get checkerJSON for topic", topic);
      const jsons = await Promise.all(
        topic.permits.map((permit) => floLegal.load(permit.flo_legal_id))
      );
      debug("the jsons", jsons);
      const res = { permits: await Promise.all(transform(jsons)) };
      debug(res);
      return JSON.stringify(res);
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
