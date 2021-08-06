const parser = require("fast-xml-parser");
const debug = require("debug")("graphql:topics");
const _ = require("lodash");

const transform = require("./transform");
const { gql } = require("../../util");

const typeDefs = gql`
  type TopicText {
    heading: String!
    intro: String!
    locationIntro: String
  }

  type Topic {
    checkerJSON: String!
    hasIMTR: Boolean!
    name: String!
    outcomes: [Outcome!]!
    slug: String!
    text: TopicText!
    userMightNotNeedPermit: Boolean!
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
    checkerJSON: async (topic) => {
      const jsons = await Promise.all(
        topic.permits.map(async (permit) => {
          const { blob } = permit.imtr_config;
          try {
            const { sttr } = JSON.parse(blob);
            const res = await parser.parse(sttr, {
              ignoreAttributes: false,
              arrayMode: true,
              attrNodeName: "attributes",
              ignoreNameSpace: false,
              attributeNamePrefix: "",
            });
            return res;
          } catch (e) {
            console.error(e);
            console.error(permit.name);
          }
        })
      );

      const permits = await Promise.all(transform(jsons));
      const topicOutcomes = topic.outcomes
        .map((outcome) => outcome.results.map(result => result.replace(/\s/g, '')))
        .sort();

      // Find all outcomes in Permit's
      const outcomes = _.uniqWith(
        permits.map((permit) =>
          _.uniq(
            permit.decisions.dummy.decisionTable.rules.map(
              (rule) => rule.output
            )
          )
        ),
        _.isEqual
      ).sort();

      console.log(permits);

      // Make sure all permit-outcomes are available in the Manager's Outcomes
      if (!_.isEqual(outcomes, topicOutcomes)) {
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
