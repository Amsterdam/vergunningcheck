import { useEffect, useReducer } from "react";

import { TopicData, defaultTopicSession } from "../SessionContext";
import { useSession, useSlug } from ".";

export const topicReducer = (
  topicData: TopicData,
  data: null | Partial<TopicData>
) => {
  const result =
    data === null
      ? defaultTopicSession
      : {
          ...topicData,
          ...data,
        };
  return result;
};

export default () => {
  const slug = useSlug();
  const { session, setSession } = useSession();

  const [topicData, setTopicData] = useReducer(
    topicReducer,
    session[slug] || defaultTopicSession
  );

  // When topicData changes, update the session
  useEffect(() => {
    setSession({ [slug]: topicData });
  }, [setSession, topicData, slug]);

  if (!slug) {
    throw new Error("failed to load topicData as slug is not found.");
  }

  return { topicData: session[slug], setTopicData };
};
