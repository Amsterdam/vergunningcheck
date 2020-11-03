import {
  SessionData,
  TopicSessionData,
  defaultTopicSession,
  setTopicSessionDataFn,
} from "../SessionContext";
import { useSession, useSlug } from ".";

export default () => {
  const [session, setSessionData] = useSession();
  const slug = useSlug();

  if (!slug) {
    throw new Error("failed to load topicData as slug is not found.");
    // throw new Error("Topic-Session not availablele without a slug");
  }

  let topicData = session[slug];
  // console.log("topicSession", topicSession);

  if (!topicData) {
    // console.log("set it now!");
    topicData = defaultTopicSession;
    // setSessionData({ [slug]: topicSession });
  }

  const setTopicData: setTopicSessionDataFn = (data) => {
    const topicSessionData: TopicSessionData = {
      ...topicData,
      ...data,
    };
    const newSessionData: SessionData = {
      [slug]: topicSessionData,
    };
    setSessionData(newSessionData);
  };

  // console.log("useTopicSession result", [topicSession, setTopicSessionData]);
  return { topicData, setTopicData };
};
