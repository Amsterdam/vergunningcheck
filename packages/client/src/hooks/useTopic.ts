import { findTopicBySlug } from "../utils";
import useSlug from "./useSlug";

export default () => {
  const slug = useSlug();
  const topic = findTopicBySlug(slug);

  if (!topic) {
    throw new Error(`useTopic: can't find topic for slug (${slug})`);
  }

  return topic;
};
