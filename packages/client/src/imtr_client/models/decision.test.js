import Decision from "./decision";
import Question from "./question";
import Rule from "./rule";

let mock;

beforeEach(() => {
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
  mock = {
    rules: { yes, no },
    question,
    decision,
    conclusion: {
      decision: conclusionDecision,
      rules: { yes: conclusionYes, no: conclusionNo },
    },
  };
});

describe("Decision", () => {
  test("id", () => {
    expect(mock.decision.id).toBe("fake-id");
    expect(() => new Decision(3, [mock.question], [mock.yes, mock.no])).toThrow(
      "'id' must be a String"
    );
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
      expect(mock.decision.getMatchingRules()[0]).toBe(undefined);
      mock.question.setAnswer(true);
      expect(mock.decision.getMatchingRules()[0]).toBe(mock.rules.yes);
      mock.question.setAnswer(false);
      expect(mock.decision.getMatchingRules()[0]).toBe(mock.rules.no);
    });

    xtest("getOpenInputs", () => {
      expect(mock.decision.getOpenInputs()).toStrictEqual([mock.question]);
      mock.question.setAnswer(true);
      expect(mock.decision.getOpenInputs()).toStrictEqual([]);
    });

    test("getQuestions", () => {
      expect(mock.decision.getQuestions()).toStrictEqual([mock.question]);
      mock.question.setAnswer(true);
      expect(mock.decision.getQuestions()).toStrictEqual([mock.question]);
    });
  });

  describe("for recursive-decision", () => {
    test("getMatchingRules", () => {
      const concl = mock.conclusion;
      expect(concl.decision.getMatchingRules()[0]).toBe(undefined);
      mock.question.setAnswer(true);
      expect(mock.decision.getMatchingRules()[0]).toBe(mock.rules.yes);

      expect(concl.decision.getMatchingRules()[0]).toBe(concl.rules.yes);
      mock.question.setAnswer(false);
      expect(concl.decision.getMatchingRules()[0]).toBe(concl.rules.no);
    });

    xtest("getOpenInputs", () => {
      const concl = mock.conclusion;
      expect(concl.decision.getOpenInputs()).toStrictEqual([mock.question]);
      mock.question.setAnswer(true);
      expect(concl.decision.getOpenInputs()).toStrictEqual([]);
    });

    xtest("getQuestions", () => {
      const concl = mock.conclusion;
      expect(concl.decision.getQuestions()).toStrictEqual([mock.question]);
      mock.question.setAnswer(true);
      expect(concl.decision.getQuestions()).toStrictEqual([mock.question]);
    });
  });
});
