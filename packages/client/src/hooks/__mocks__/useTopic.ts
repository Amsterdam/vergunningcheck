import { topics } from "../../config";

export default () => {
  return topics.find(({ slug }) => slug === "dakkapel-plaatsen");
};
