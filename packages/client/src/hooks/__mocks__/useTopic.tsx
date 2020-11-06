import { Topic, topics } from "../../config";

export default () => {
  return topics.find((topic: Topic) => topic.slug === "dakkapel-plaatsen");
};
