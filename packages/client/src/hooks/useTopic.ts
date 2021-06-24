import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";

import { GraphQLTopic } from "../types";
import useSlug from "./useSlug";

const query = loader("../queries/Topic.graphql");

export default () => {
  const slug = useSlug();
  const { loading, error, data } = useQuery<{
    topic: GraphQLTopic;
  }>(query, { variables: { slug } });

  if (loading) {
    return null;
  } else if (error) {
    throw new Error(`${error}`);
  }

  const { topic } = data as { topic: GraphQLTopic };

  if (!topic) {
    throw new Error(`useTopic: can't find topic for slug (${slug})`);
  }

  return topic;
};
