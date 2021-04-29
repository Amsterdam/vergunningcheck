import { TopicType } from "../types";
import { findTopicBySlug } from "../utils";
import Topic from "./topic";

const mockTopic = new Topic({
  intro: "intro",
  name: "name",
  slug: "slug",
  text: {
    heading: "heading",
  },
  type: TopicType.PERMIT_FORM,
});

const realTopic = findTopicBySlug("dakkapel-plaatsen") as Topic;

describe("Topic", () => {
  test("returns correct data for a new class", () => {
    const {
      hasIMTR,
      intro,
      isConfiguredPermitCheck,
      isPermitCheck,
      isPermitForm,
      name,
      slug,
      text: { heading },
      type,
    } = mockTopic;

    expect(heading).toBe("heading");
    expect(name).toBe("name");
    expect(intro).toBe("intro");
    expect(slug).toBe("slug");
    expect(type).toBe(TopicType.PERMIT_FORM);

    expect(hasIMTR).toBe(false);
    expect(isConfiguredPermitCheck).toBe(false);
    expect(isPermitCheck).toBe(false);
    expect(isPermitForm).toBe(true);
  });

  test("returns correct data for an existing topic", () => {
    const {
      hasIMTR,
      intro,
      isConfiguredPermitCheck,
      isPermitCheck,
      name,
      slug,
      text: { heading },
      type,
    } = realTopic;

    expect(heading).toBeDefined();
    expect(intro).toBeDefined();
    expect(name).toBeDefined();
    expect(slug).toBeDefined();
    expect(type).toBe(TopicType.PERMIT_CHECK);

    expect(hasIMTR).toBe(true);
    expect(isConfiguredPermitCheck).toBe(true);
    expect(isPermitCheck).toBe(true);
  });
});
