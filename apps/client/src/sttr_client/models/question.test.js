import Question from "./question";

const getQuestion = () =>
  new Question({
    id: "aaa",
    type: "boolean",
    text: "Are you ok?",
    prio: 10,
    description: "Describe how you are _feeling_.",
  });

describe("Question", () => {
  test("initialization", () => {
    const { id, type, text, description } = getQuestion();
    expect(id).toBe("aaa");
    expect(type).toBe("boolean");
    expect(text).toBe("Are you ok?");
    expect(description).toBe("Describe how you are _feeling_.");
  });

  test("answer", () => {
    const question = getQuestion();
    question.setAnswer(true);
    expect(question.answer).toBe(true);
    question.setAnswer(false);
    expect(question.answer).toBe(false);
    expect(() => question.setAnswer("goooo")).toThrow(
      "value for setAnswer must be of type boolean, got 'goooo'"
    );
  });
});
