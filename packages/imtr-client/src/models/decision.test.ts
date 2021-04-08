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

  const outcomeYes = new Rule(["Something big"], "You need this permit.");
  const outcomeNo = new Rule(
    ["Something small"],
    "You don't need this permit."
  );

  const outcomeDecision = new Decision(
    "dummy",
    [decision],
    [outcomeYes, outcomeNo]
  );
  return {
    rules: { yes, no },
    question,
    decision,
    outcome: {
      decision: outcomeDecision,
      rules: { yes: outcomeYes, no: outcomeNo },
    },
  };
};

describe("Decision", () => {
  xtest("id", () => {
    const mock = getMock();
    expect(mock.decision.id).toBe("fake-id");
    expect(
      () =>
        new Decision(3 as any, [mock.question], [mock.rules.yes, mock.rules.no])
    ).toThrow("'id' must be a String");
  });

  xdescribe("for Questions", () => {
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

  describe("decision with question.collection", () => {
    test("getMatchingRules", () => {
      const question = new Question({
        id: "abc",
        type: "string",
        text: "What outcome",
        collection: true,
        options: ["Need permit", "Need report"],
        prio: 10,
      });

      const decision = new Decision(
        "fake-id",
        [question],
        [
          new Rule(["Need permit"], "need-permit"),
          new Rule(["Need report"], "need-report"),
        ]
      );

      question.setAnswer(['"Need permit"', '"Need report"']);
      expect(
        decision.getMatchingRules().map((rule) => rule.outputValue)
      ).toEqual(["need-permit", "need-report"]);

      const dummy = new Decision(
        "dummy",
        [decision],
        [
          new Rule(["need-permit"], "Please get a permit."),
          new Rule(["need-report"], "Please get a report."),
        ]
      );

      expect(dummy.getMatchingRules().map((rule) => rule.outputValue)).toEqual([
        "Please get a permit.",
        "Please get a report.",
      ]);
    });
  });

  xdescribe("for recursive-decision", () => {
    test("getMatchingRules", () => {
      const mock = getMock();
      const concl = mock.outcome;
      expect(concl.decision.getMatchingRules()[0]).toBe(undefined);
      mock.question.setAnswer(true);
      expect(mock.decision.getMatchingRules()[0]).toBe(mock.rules.yes);

      expect(concl.decision.getMatchingRules()[0]).toBe(concl.rules.yes);
      mock.question.setAnswer(false);
      expect(concl.decision.getMatchingRules()[0]).toBe(concl.rules.no);
    });

    test("getQuestions on outcome doesn't give questions", () => {
      const mock = getMock();
      expect(mock.outcome.decision.getQuestions()).toStrictEqual([]);
    });
  });
});
