import Checker from "./checker";
import Decision from "./decision";
import Permit from "./permit";
import Question from "./question";
import Rule from "./rule";

describe("IMTR specific", () => {
  test('"-" and "no hit" support', () => {
    const q1 = new Question({
      id: "aaa",
      type: "boolean",
      text: "Do you need a permit?",
      prio: 10,
    });
    const q2 = new Question({
      id: "bbb",
      type: "boolean",
      text: "Are you sure?",
      prio: 20,
    });
    const d1 = new Decision({
      id: "d1",
      inputs: [q1, q2],
      rules: [
        new Rule({ inputConditions: [true], outputValue: "permit-required" }),
        new Rule({
          inputConditions: [false, false],
          outputValue: "permit-required",
        }),
        new Rule({
          inputConditions: [false, true],
          outputValue: "no-permit-required",
        }),
      ],
    });
    const dummy = new Decision({
      id: "dummy",
      inputs: [d1],
      rules: [
        new Rule({
          inputConditions: ["permit-required"],
          outputValue: "You need a permit.",
        }),
        new Rule({
          inputConditions: ["no-permit-required"],
          outputValue: "You don't need a permit.",
        }),
      ],
    });

    const checker = new Checker({
      permits: [
        new Permit({
          name: "some permit",
          version: 1,
          decisions: [dummy],
        }),
      ],
    });
    let question = checker.next() as Question;
    question.setAnswer(true);
    expect(checker.permits[0].getOutputByDecisionId("dummy")).toBe(
      "You need a permit."
    );
    question.setAnswer(false);
    expect(checker.permits[0].getOutputByDecisionId("dummy")).toBe(undefined);
    question = checker.next() as Question;
    question.setAnswer(true);
    expect(checker.permits[0].getOutputByDecisionId("dummy")).toBe(
      "You don't need a permit."
    );
    question.setAnswer(false);
    expect(checker.permits[0].getOutputByDecisionId("dummy")).toBe(
      "You need a permit."
    );
  });
});
