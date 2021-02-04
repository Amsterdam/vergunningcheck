import { useContext } from "react";

import { SessionContext } from "../SessionContext";

export default () => {
  const { topicData, setTopicData } = useContext(SessionContext);
  return { topicData, setTopicData };
};
