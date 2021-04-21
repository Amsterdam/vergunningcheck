const debug = require("debug")("graphql:topics");
const fetch = require("node-fetch");
const transform = require("@vergunningcheck/imtr/src/parser");

/**
 * Preprocessors are used to change the incoming xml. The xml
 * is not yet parsed, so they are basic find replace functions.
 * The output of every preprocessor is passed as input to the next.
 */
// const { preprocessors } = require("@vergunningcheck/imtr/src/transform");
const preprocessors = [
  // Replace phone number with Link
  (str: string) => str.replace(/ 14\s?020/g, " [14 020](tel:14020)"),
];

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
  type Outcomes {
    floLegalOutcomes: [String]
    text: String
  }
  type IMTRTopic {
    name: String!
    slug: String!
    intro: String
    checker: Checker!
    outcomes: [Outcomes!]!
  }

  extend type Query {
    imtrTopics: [IMTRTopic!]!
    imtrTopic(slug: String): IMTRTopic
  }
`;

const resolvers = {
  Query: {
    imtrTopic: (_: any, { slug }: any, { loaders: { manager } }: any) => {
      const result = manager.load([slug]);
      debug("find topic", slug, result);
      return result;
    },
    imtrTopics: async (_: any, __: any, { loaders: { managerList } }: any) => {
      const result = await managerList.load(1);
      debug("find topics", result);
      return result;
    },
  },
  IMTRTopic: {
    checker: async ({ permits: permitIds }: any) => {
      debug("permitIds", permitIds);
      const permits = await Promise.all(
        permitIds.map(({ url }: any) => {
          debug("fetching url", url);
          return fetch(url);
        })
      );
      return transform({ permits });
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
