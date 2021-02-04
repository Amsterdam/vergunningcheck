import { topics } from "../../config";
import { Topic } from "../../types";

export default () => {
  return topics.find((topic: Topic) => topic.slug === "dakkapel-plaatsen");
};
