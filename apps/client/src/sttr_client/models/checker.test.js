import Checker from "./checker";
import Permit from "./permit";
import Question from "./question";
import Rule from "./rule";
import Decision from "./decision";
import { getQuestionConfig } from "../utils/mocks";

const q1 = new Question(getQuestionConfig());
const q2 = new Question(getQuestionConfig());

const getChecker = (questions) => {
  const d1 = new Decision(
    "dummy",
    [q1, q2],
    [
      new Rule([false], "no"),
      new Rule([true, false], "not sure"),
      new Rule([true, true], "yes"),
    ]
  );
  const dummy = new Decision(
    "dummy",
    [d1],
    [
      new Rule(["no"], "nope"),
      new Rule(["not sure"], "what?"),
      new Rule(["yes"], "hell yeah"),
    ]
  );
  return new Checker([new Permit("drivers-licence", [dummy])]);
};

describe("Checker recursive", () => {
  test("initialization", () => {
    const d1 = new Decision(
      "a",
      [q1],
      [new Rule([true], "fun!"), new Rule([false], "boring")]
    );
    const d2 = new Decision(
      "b",
      [q1, q2],
      [new Rule([true, false], "non local"), new Rule([true, true], "local")]
    );
    const d3 = new Decision(
      "dummy",
      [d1, d2],
      [
        new Rule(["boring"], "Maybe you should move?"),
        new Rule(["fun!", "non local"], "Hi Robin or Sven"),
        new Rule(["fun!", "local"], "Hi André"),
      ]
    );
    const checker = new Checker([new Permit("some permit", [d1, d2, d3])]);

    let question = checker.next();
    expect(question).toBe(q1);
    question.setAnswer(true);
    question = checker.next();
    question.setAnswer(true);
    expect(checker.permits[0].getOutputByDecisionId("dummy")).toBe("Hi André");

    question = checker.rewindTo(0);
    question.setAnswer(true);
    question = checker.next();
    question.setAnswer(false);
    expect(checker.permits[0].getOutputByDecisionId("dummy")).toBe(
      "Hi Robin or Sven"
    );

    question = checker.rewindTo(0);
    question.setAnswer(false);
    expect(checker.permits[0].getOutputByDecisionId("dummy")).toBe(
      "Maybe you should move?"
    );
  });
});

describe("Checker navigation", () => {
  test("next", () => {
    const checker = getChecker([q1, q2]);
    const question = checker.next(); // first
    expect(question).toBe(questions[0]);
    expect(question.answer).toBe(undefined);
    expect(checker.permits[0].getOutputByDecisionId("dummy")).toBe(undefined);

    expect(() => checker.next()).toThrow("Please answer the question first");
  });
  test("rewindTo", () => {
    const checker = getChecker([q1, q2]);
    let question = checker.next();
    question.setAnswer(true);
    question = checker.next();
    question.setAnswer(false);
    question = checker.rewindTo(1); // also known as _current in this case
    expect(question).toBe(questions[1]);
    question = checker.rewindTo(0);
    expect(question).toBe(questions[0]);
  });

  test("remember answers", () => {
    const checker = getChecker([q1, q2]);
    // set some answers
    let question = checker.next();
    question.setAnswer(true);
    question = checker.next();
    question.setAnswer(false);

    // rewind 1 question and validate answers still there
    question = checker.previous();
    expect(question.answer).toBe(true);
    question = checker.next();
    expect(question.answer).toBe(false);

    // rewind with goto should also preserve answers
    question = checker.rewindTo(0);
    expect(question.answer).toBe(true);
    question = checker.next();
    expect(question.answer).toBe(false);
  });
  test("previous", () => {
    const checker = getChecker([q1, q2]);
    let question = checker.next(); // first
    question.setAnswer(true);
    question = checker.next(); // second
    expect(question).toBe(questions[1]);
    question = checker.previous();
    expect(question).toBe(questions[0]);
    expect(() => checker.previous()).toThrow(
      "'rewindTo' index cannot be less then 0"
    );
  });
  test("done + previous", () => {
    const checker = getChecker([q1, q2]);
    let question = checker.next();
    question.setAnswer(true);
    question = checker.next();
    question.setAnswer(true);
    question = checker.next();
    expect(question).toBe(null);
    question = checker.previous();
    expect(question).toBe(questions[1]);
  });
});
