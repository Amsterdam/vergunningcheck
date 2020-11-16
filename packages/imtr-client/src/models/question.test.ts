import Question from "./question";

const getQuestion = ({ ...overrides }: any) =>
  new Question({
    id: "aaa",
    type: "boolean",
    text: "Are you ok?",
    prio: 10,
    description: "Describe how you are _feeling_.",
    ...overrides,
  });

describe("Question", () => {
  it("initializes", () => {
    const { id, type, text, description } = getQuestion({});
    expect(id).toBe("aaa");
    expect(type).toBe("boolean");
    expect(text).toBe("Are you ok?");
    expect(description).toBe("Describe how you are _feeling_.");
  });

  it("can be answered", () => {
    const question = getQuestion({});
    question.setAnswer(true);
    expect(question.answer).toBe(true);
    question.setAnswer(false);
    expect(question.answer).toBe(false);
    expect(() => question.setAnswer("goooo")).toThrow(
      "value for setAnswer must be of type boolean, got 'goooo'"
    );
  });

  it("supports collection", () => {
    expect(() => getQuestion({ collection: true, type: "boolean" })).toThrow(
      "Cannot construct question with collection: true but not type string (got 'boolean')"
    );

    expect(() => getQuestion({ collection: true })).toThrow(
      "Cannot construct question with collection: true but no options provided"
    );

    const question = getQuestion({ collection: true, options: ["a", "b"] });
    expect(() => question.setAnswer("goooo")).toThrow(
      "value for setAnswer must be of type string[] for collections, got 'goooo'"
    );

    question.setAnswer(["a", "b"]);
    expect(question.answer).toBe(["a", "b"]);
    question.setAnswer(["a"]);
    expect(question.answer).toBe(["a"]);

    expect(() => question.setAnswer(["c"])).toThrow(
      "value 'c' in setAnswer is not in options-list ['a', 'b']"
    );
  });
});
