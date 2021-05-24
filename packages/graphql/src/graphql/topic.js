const debug = require("debug")("graphql:topics");

const transform = require("../loaders/floLegal/transform");
const { gql, arrayEquals } = require("../util");

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

      const permits = await Promise.all(transform(jsons));
      const topicOutcomes = topic.outcomes.map((outcome) => outcome.results);

      // Find all outcomes in Permit's
      const outcomes = permits
        .flatMap((permit) =>
          permit.decisions.dummy.decisionTable.rules.map((rule) => rule.output)
        )
        // filter unique values
        .filter((value, index, self) => self.indexOf(value) === index);

      // Make sure all permit-outcomes are available in the Manager's Outcomes
      debug("outcomes", outcomes, topic.outcomes);

      if (
        !arrayEquals(
          outcomes,
          topic.outcomes.flatMap((outcome) => outcome.results)
        )
      ) {
        throw new Error(
          `Outcomes don't match. IMTR files contain these outcomes:
          ${JSON.stringify(outcomes)}
          The Manager Topic contains:
          ${JSON.stringify(topicOutcomes)}
          `
        );
      }

      return JSON.stringify({ permits });
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
