import Checker, { clientOutcomes, imtrOutcomes } from "./checker";
import Decision from "./decision";
import Permit from "./permit";
import Question from "./question";
import Rule from "./rule";

const getChecker = (questions: Question[]) => {
  const d1 = new Decision({
    id: "dummy",
    inputs: questions,
    rules: [
      new Rule({ inputConditions: [false], outputValue: "no" }),
      new Rule({ inputConditions: [true, false], outputValue: "not sure" }),
      new Rule({ inputConditions: [true, true], outputValue: "yes" }),
    ],
  });
  const dummy = new Decision({
    id: "dummy",
    inputs: [d1],
    rules: [
      new Rule({
        inputConditions: ["no"],
        outputValue: imtrOutcomes.PERMIT_FREE,
      }),
      new Rule({
        inputConditions: ["not sure"],
        outputValue: imtrOutcomes.NEED_CONTACT,
      }),
      new Rule({
        inputConditions: ["yes"],
        outputValue: imtrOutcomes.NEED_PERMIT,
      }),
    ],
  });
  return new Checker({
    permits: [
      new Permit({ name: "drivers-licence", version: 1, decisions: [dummy] }),
    ],
  });
};
const getQuestions = () => [
  new Question({
    id: "aaa",
    type: "boolean",
    text: "Are you older then 18 years?",
    prio: 10,
  }),
  new Question({
    id: "bbb",
    type: "boolean",
    text: "Do you live in the Netherlands?",
    prio: 20,
  }),
];

describe("Permit", () => {
  test("getDecisionById", () => {
    const d = new Decision({
      id: "somedummy",
      inputs: getQuestions(),
      rules: [new Rule({ inputConditions: [false], outputValue: "no" })],
    });
    const permit = new Permit({ name: "myperm", version: 1, decisions: [d] });
    expect(permit.getDecisionById("somedummy")).toBe(d);
  });
  test("simple imtr checker", () => {
    const questions = getQuestions();
    const checker = getChecker(questions);
    let question = checker.next() as Question;
    expect(checker.permits[0].getOutputByDecisionId("dummy")).toBe(undefined);
    expect(checker.isConclusive()).toBe(false);

    // Change the values a bit on the first question
    question.setAnswer(false);
    expect(checker.permits[0].getOutputByDecisionId("dummy")).toBe(
      imtrOutcomes.PERMIT_FREE
    );
    question.setAnswer(true);
    expect(checker.permits[0].getOutputByDecisionId("dummy")).toBe(undefined);

    // Answer and move to next question
    question = checker.next() as Question;
    expect(checker.permits[0].getOutputByDecisionId("dummy")).toBe(undefined);
    question.setAnswer(true);
    expect(checker.permits[0].getOutputByDecisionId("dummy")).toBe(
      imtrOutcomes.NEED_PERMIT
    );
    expect(checker.getOutcomesToDisplay()[0].outcome).toBe(
      imtrOutcomes.NEED_PERMIT
    );
    expect(checker.getAllOutcomeTypes()).toEqual([imtrOutcomes.NEED_PERMIT]);
    expect(checker.getClientOutcomeType()).toBe(clientOutcomes.NEED_PERMIT);

    question.setAnswer(false);
    expect(checker.permits[0].getOutputByDecisionId("dummy")).toBe(
      imtrOutcomes.NEED_CONTACT
    );

    question = checker.next() as any;
    expect(question).toBe(null);

    // Should have correct outcome
    expect(checker.isConclusive()).toBe(true);
    expect(checker.getOutcomesToDisplay().length).toBe(1);
    expect(checker.getOutcomesToDisplay()[0].outcome).toBe(
      imtrOutcomes.NEED_CONTACT
    );
    expect(checker.getAllOutcomeTypes()).toEqual([imtrOutcomes.NEED_CONTACT]);
    expect(checker.getClientOutcomeType()).toBe(clientOutcomes.NEED_CONTACT);
  });
});
