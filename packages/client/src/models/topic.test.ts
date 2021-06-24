import { findTopicBySlug } from "../utils";
import Topic from "./topic";

const testTopic = findTopicBySlug("dakkapel-plaatsen") as Topic;

describe("Topic", () => {
  test("returns correct data for an existing topic", () => {
    const {
      hasIMTR,
      intro,
      name,
      slug,
      text: { heading },
    } = testTopic;

    expect(heading).toBeDefined();
    expect(intro).toBeDefined();
    expect(name).toBeDefined();
    expect(slug).toBeDefined();

    expect(hasIMTR).toBe(true);
  });
});
