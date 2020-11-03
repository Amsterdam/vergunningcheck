import Decision from "./decision";
import Question from "./question";
import Rule from "./rule";

const getMock = () => {
  const yes = new Rule([true], "Something big");
  const no = new Rule([false], "Something small");

  const question = new Question({
    id: "abc",
    type: "boolean",
    text: "Are you planning something big?",
    prio: 10,
  });
  const decision = new Decision("fake-id", [question], [yes, no]);

  const conclusionYes = new Rule(["Something big"], "You need this permit.");
  const conclusionNo = new Rule(
    ["Something small"],
    "You don't need this permit."
  );

  const conclusionDecision = new Decision(
    "dummy",
    [decision],
    [conclusionYes, conclusionNo]
  );
  return {
    rules: { yes, no },
    question,
    decision,
    conclusion: {
      decision: conclusionDecision,
      rules: { yes: conclusionYes, no: conclusionNo },
    },
  };
};

describe("Decision", () => {
  test("id", () => {
    const mock = getMock();
    expect(mock.decision.id).toBe("fake-id");
    expect(
      () =>
        new Decision(3 as any, [mock.question], [mock.rules.yes, mock.rules.no])
    ).toThrow("'id' must be a String");
  });

  describe("for Questions", () => {
    test("getDecisiveInputs", () => {
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
      const d1 = new Decision(
        "b",
        [q1, q2],
        [
          new Rule([false], "not interested"),
          new Rule([true, false], "maybe later"),
          new Rule([true, true], "let's go"),
        ]
      );

      // const d3 = new Decision(
      // 	"dummy",
      // 	[d1, d2],
      // 	[
      // 		new Rule(["boring"], "Maybe you should move?"),
      // 		new Rule(["fun!", "non local"], "Hi Robin or Sven"),
      // 		new Rule(["fun!", "local"], "Hi André")
      // 	]
      // );
      q2.setAnswer(true);
      expect(d1.getDecisiveInputs()).toStrictEqual([]);
      q1.setAnswer(false);
      q2.setAnswer(false);
      expect(d1.getDecisiveInputs()).toStrictEqual([q1]);
      q1.setAnswer(true);
      q2.setAnswer(false);
      expect(d1.getDecisiveInputs()).toStrictEqual([q1, q2]);
    });

    test("getMatchingRules", () => {
      const mock = getMock();
      expect(mock.decision.getMatchingRules()[0]).toBe(undefined);
      mock.question.setAnswer(true);
      expect(mock.decision.getMatchingRules()[0]).toBe(mock.rules.yes);
      mock.question.setAnswer(false);
      expect(mock.decision.getMatchingRules()[0]).toBe(mock.rules.no);
    });

    test("getQuestions", () => {
      const mock = getMock();
      expect(mock.decision.getQuestions()).toStrictEqual([mock.question]);
      mock.question.setAnswer(true);
      expect(mock.decision.getQuestions()).toStrictEqual([mock.question]);
    });
  });

  describe("for recursive-decision", () => {
    test("getMatchingRules", () => {
      const mock = getMock();
      const concl = mock.conclusion;
      expect(concl.decision.getMatchingRules()[0]).toBe(undefined);
      mock.question.setAnswer(true);
      expect(mock.decision.getMatchingRules()[0]).toBe(mock.rules.yes);

      expect(concl.decision.getMatchingRules()[0]).toBe(concl.rules.yes);
      mock.question.setAnswer(false);
      expect(concl.decision.getMatchingRules()[0]).toBe(concl.rules.no);
    });

    test("getQuestions on conclusion doesn't give questions", () => {
      const mock = getMock();
      expect(mock.conclusion.decision.getQuestions()).toStrictEqual([]);
    });
  });
});
