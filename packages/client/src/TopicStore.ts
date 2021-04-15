import { createContext } from "react";

import { TopicDataProps, TopicStoreApi } from "./interface";

export const initialProps: TopicDataProps = {
  id: "",
  slug: "",
  name: "",
  heading: "",
  intro: "",
};

export default createContext<TopicStoreApi>({
  topicData: initialProps,
  setTopicData: (props: TopicDataProps) => null,
});
