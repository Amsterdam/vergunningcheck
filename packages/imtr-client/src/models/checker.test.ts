import { hydrateChecker } from "../hydrate";
import {
  getCheckerConfig,
  getDecisionConfig,
  getPermitConfig,
  getQuestionConfig,
  PartialDecisionConfig,
  PartialDummyConfig,
  PartialPermitConfig,
  PartialQuestionConfig,
} from "../utils/mock";
import Checker from "./checker";
import Decision from "./decision";
import Permit from "./permit";
import Question from "./question";
import Rule from "./rule";

const getQuestions = () => {
  return [
    new Question(getQuestionConfig({ prio: 10, type: "boolean" })),
    new Question(getQuestionConfig({ prio: 20, type: "boolean" })),
  ];
};

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
      new Rule({ inputConditions: ["no"], outputValue: "nope" }),
      new Rule({ inputConditions: ["not sure"], outputValue: "what?" }),
      new Rule({ inputConditions: ["yes"], outputValue: "hell yeah" }),
    ],
  });
  return new Checker({
    permits: [
      new Permit({ name: "drivers-licence", version: 23, decisions: [dummy] }),
    ],
  });
};

describe("Checker", () => {
  test("permit order", () => {
    const d1 = new Decision({
      id: "a",
      inputs: [new Question(getQuestionConfig({ prio: 10, type: "boolean" }))],
      rules: [new Rule({ inputConditions: ["no"], outputValue: "nope" })],
    });
    const d2 = new Decision({
      id: "b",
      inputs: [
        new Question(getQuestionConfig({ prio: 10, type: "boolean" })),
        new Question(getQuestionConfig({ prio: 20, type: "boolean" })),
      ],
      rules: [new Rule({ inputConditions: ["no"], outputValue: "nope" })],
    });
    const p1 = new Permit({
      name: "permit-1-question",
      version: 23,
      decisions: [d1],
    });
    const p2 = new Permit({
      name: "permit-2-questions",
      version: 23,
      decisions: [d2],
    });
    const c1 = new Checker({ permits: [p1, p2] });
    const c2 = new Checker({ permits: [p2, p1] });
    expect(c1.permits).toStrictEqual([p1, p2]);
    expect(c2.permits).toStrictEqual([p1, p2]);
  });
});

describe("Checker recursive", () => {
  test("initialization", () => {
    const input: PartialQuestionConfig = {
      id: "some random id",
    };
    const decision: PartialDecisionConfig = {
      inputs: [input] as PartialQuestionConfig[],
    };
    const permit: PartialPermitConfig = {
      decisions: [decision],
    };

    const checker = hydrateChecker(
      getCheckerConfig({
        permits: [permit],
      })
    );
    expect(checker.next()?.id).toEqual("asdf");

    // const questions = getQuestions();

    // const d1 = new Decision({
    //   id: "a",
    //   inputs: [questions[0]],
    //   rules: [
    //     new Rule({ inputConditions: [true], outputValue: "fun!" }),
    //     new Rule({ inputConditions: [false], outputValue: "boring" }),
    //   ],
    // });
    // const d2 = new Decision({
    //   id: "b",
    //   inputs: questions,
    //   rules: [
    //     new Rule({ inputConditions: [true, false], outputValue: "non local" }),
    //     new Rule({ inputConditions: [true, true], outputValue: "local" }),
    //   ],
    // });
    // const d3 = new Decision({
    //   id: "dummy",
    //   inputs: [d1, d2],
    //   rules: [
    //     new Rule({
    //       inputConditions: ["boring"],
    //       outputValue: "Maybe you should move?",
    //     }),
    //     new Rule({
    //       inputConditions: ["fun!", "non local"],
    //       outputValue: "Hi Robin or Sven",
    //     }),
    //     new Rule({
    //       inputConditions: ["fun!", "local"],
    //       outputValue: "Hi André",
    //     }),
    //   ],
    // });
    // const checker = new Checker({
    //   permits: [
    //     new Permit({
    //       name: "some permit",
    //       version: 22,
    //       decisions: [d1, d2, d3],
    //     }),
    //   ],
    // });

    // let question = checker.next() as Question;
    // expect(question).toBe(questions[0]);
    // question.setAnswer(true);
    // question = checker.next() as Question;
    // question.setAnswer(true);
    // expect(checker.permits[0].getOutputByDecisionId("dummy")).toBe("Hi André");

    // question = checker.rewindTo(0);
    // question.setAnswer(true);
    // question = checker.next() as Question;
    // question.setAnswer(false);
    // expect(checker.permits[0].getOutputByDecisionId("dummy")).toBe(
    //   "Hi Robin or Sven"
    // );

    // question = checker.rewindTo(0);
    // question.setAnswer(false);
    // expect(checker.permits[0].getOutputByDecisionId("dummy")).toBe(
    //   "Maybe you should move?"
    // );
  });

  test("initialization after refresh", () => {
    const questions = getQuestions();
    const checker = getChecker(questions);
    const question = checker.next() as Question;
    question.setAnswer(true);

    const data = checker.getQuestionAnswers();
    const freshChecker = getChecker(questions);
    freshChecker.setQuestionAnswers(data);
    expect(freshChecker.rewindTo(0).answer).toBe(true);
  });
});

describe("Checker internals", () => {
  const qShared = new Question(
    getQuestionConfig({
      text: "shared question",
      prio: 10,
      type: "boolean",
      autofill: "yes please",
    })
  );

  const q1 = new Question(getQuestionConfig({ prio: 20, type: "boolean" }));
  const d1 = new Decision({
    id: "d1",
    inputs: [qShared, q1],
    rules: [new Rule({ inputConditions: [false], outputValue: "z" })],
  });
  const dummy1 = new Decision({
    id: "dummy",
    inputs: [d1],
    rules: [new Rule({ inputConditions: [true], outputValue: "y" })],
  });
  const permit1 = new Permit({ name: "x", version: 1, decisions: [dummy1] });

  const q2 = new Question(getQuestionConfig({ prio: 30, type: "boolean" }));
  const d2 = new Decision({
    id: "d2",
    inputs: [qShared, q2],
    rules: [new Rule({ inputConditions: [false], outputValue: "z" })],
  });
  const dummy2 = new Decision({
    id: "dummy",
    inputs: [d2],
    rules: [new Rule({ inputConditions: [false], outputValue: "x" })],
  });
  const permit2 = new Permit({ name: "y", version: 1, decisions: [dummy2] });

  const checker = new Checker({ permits: [permit1, permit2] });

  test("_getConclusionDecisions", () => {
    expect(checker._getConclusionDecisions()).toStrictEqual([d1, d2]);
  });

  test("_getAllQuestions", () => {
    expect(checker._getAllQuestions()).toStrictEqual([qShared, q1, q2]);
  });

  test("_getUpcomingQuestions", () => {
    expect(checker._getUpcomingQuestions()).toStrictEqual([q1, q2]);
    checker.next();
    expect(checker.stack).toStrictEqual([q1]);
    q1.setAnswer(true);

    expect(checker._getUpcomingQuestions()).toStrictEqual([q2]);
    const next = checker.next();
    expect(next).toStrictEqual(q2);
    expect(checker._getUpcomingQuestions()).toStrictEqual([]);
  });
});

describe("Checker navigation", () => {
  test("next", () => {
    const questions = getQuestions();
    const checker = getChecker(questions);
    const question = checker.next() as Question; // first
    expect(question).toBe(questions[0]);
    expect(question.answer).toBe(undefined);
    expect(checker.permits[0].getOutputByDecisionId("dummy")).toBe(undefined);

    expect(() => checker.next()).toThrow("Please answer the question first");
  });

  test("rewindTo", () => {
    const questions = getQuestions();
    const checker = getChecker(questions);
    let question = checker.next() as Question;
    question.setAnswer(true);
    question = checker.next() as Question;
    question.setAnswer(false);
    question = checker.rewindTo(1); // also known as _current in this case
    expect(question).toBe(questions[1]);
    question = checker.rewindTo(0);
    expect(question).toBe(questions[0]);
  });

  test("remember answers", () => {
    const questions = getQuestions();
    const checker = getChecker(questions);
    // set some answers
    let question = checker.next() as Question;
    question.setAnswer(true);
    question = checker.next() as Question;
    question.setAnswer(false);

    // rewind 1 question and validate answers still there
    question = checker.previous();
    expect(question.answer).toBe(true);
    question = checker.next() as Question;
    expect(question.answer).toBe(false);

    // rewind with goto should also preserve answers
    question = checker.rewindTo(0);
    expect(question.answer).toBe(true);
    question = checker.next() as Question;
    expect(question.answer).toBe(false);
  });

  test("previous", () => {
    const questions = getQuestions();
    const checker = getChecker(questions);
    let question = checker.next() as Question; // first
    question.setAnswer(true);
    question = checker.next() as Question; // second
    expect(question).toBe(questions[1]);
    question = checker.previous();
    expect(question).toBe(questions[0]);
    expect(() => checker.previous()).toThrow(
      "'rewindTo' index cannot be less then 0"
    );
  });

  test("done + previous", () => {
    const questions = getQuestions();
    const checker = getChecker(questions);
    let question = checker.next() as Question;
    question.setAnswer(true);
    question = checker.next() as Question;
    question.setAnswer(true);
    question = checker.next() as Question;
    expect(question).toBe(null);
    question = checker.previous();
    expect(question).toBe(questions[1]);
  });
});
