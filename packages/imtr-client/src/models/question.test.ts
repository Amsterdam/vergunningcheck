import { addQuotes } from "../utils";
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
    expect(id).toEqual("aaa");
    expect(type).toEqual("boolean");
    expect(text).toEqual("Are you ok?");
    expect(description).toEqual("Describe how you are _feeling_.");
  });

  it("can be answered with strings", () => {
    const question = getQuestion({});
    question.setAnswer(true);
    expect(question.answer).toEqual(true);
    question.setAnswer(false);
    expect(question.answer).toEqual(false);
    expect(() => question.setAnswer("goooo")).toThrow(
      "value for setAnswer must be of type boolean, got 'goooo'"
    );
  });

  it("supports collection", () => {
    const options = ["a", "b"];
    const quotedOptions = options.map(addQuotes);
    expect(() =>
      getQuestion({ collection: true, options, type: "boolean" })
    ).toThrow(
      "Cannot construct question with collection: true but not type string (got 'boolean')"
    );

    expect(() => getQuestion({ collection: true, type: "string" })).toThrow(
      "Cannot construct question with collection: true but no options provided"
    );

    const question = getQuestion({
      collection: true,
      type: "string",
      options,
    });
    expect(() => question.setAnswer("goooo")).toThrow(
      "value for setAnswer must be of type string[] for collections, got 'goooo'"
    );

    expect(() => question.setAnswer(['"c"'])).toThrow(
      'value \'"c"\' in setAnswer is not in options-list \'"a","b"\''
    );

    question.setAnswer(quotedOptions);
    expect(question.answer).toEqual(quotedOptions);
    question.setAnswer(['"a"']);
    expect(question.answer).toEqual(['"a"']);
  });
});
