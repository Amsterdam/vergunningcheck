import { testTopic } from "../utils/test-utils";

describe("Topic", () => {
  test("returns correct data for an existing topic", () => {
    const {
      hasIMTR,
      name,
      slug,
      text: { heading, intro },
    } = testTopic;

    expect(heading).toBeDefined();
    expect(intro).toBeDefined();
    expect(name).toBeDefined();
    expect(slug).toBeDefined();

    expect(hasIMTR).toBe(true);
  });
});
