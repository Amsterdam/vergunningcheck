import Checker from "./checker";
import Permit from "./permit";
import Question from "./question";
import Rule from "./rule";
import Decision from "./decision";

const q1 = new Question({
  id: "aaa",
  type: "boolean",
  text: "Are you having fun?",
  prio: 10,
});
const q2 = new Question({
  id: "bbb",
  type: "boolean",
  text: "Do you live in Alkmaar?",
  prio: 20,
});

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
