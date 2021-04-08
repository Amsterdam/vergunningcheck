import {
  CheckerConfig,
  DecisionConfig,
  hydrateChecker,
  hydrateDecision,
  hydratePermit,
  hydrateQuestion,
  hydrateRule,
  PermitConfig,
  QuestionConfig,
  RuleConfig,
} from "./hydrate";
import {
  // getCheckerConfig,
  getPermitConfig,
  getDecisionConfig,
  getQuestionConfig,
  getRuleConfig,
  getCheckerConfig,
  arr,
  number,
} from "./utils/mock";

const fixedQuestionConfig: QuestionConfig = {
  answer: '"b"',
  autofill: "Yes autofill 234()-!@#$%^&*()P",
  description: "some random description or undefined",
  id: "83ac94c0-92de-40df-a6f5-b96ee9b97cc4",
  longDescription: "some very long description with [some](markdown)",
  options: ["a", "b"],
  prio: 150,
  text: "Id fugiat ut molestiae delectus quia voluptas ab.",
  type: "string",
  uuid: "slopen vraag monument",
};

const fixedRuleConfig: RuleConfig = {
  inputConditions: [false, true, false],
  outputValue: 3,
  description: "Aut quasi deleniti amet.",
};

describe("mock", () => {
  describe("Checker", () => {
    test("Rehydration", () => {
      const mock = getCheckerConfig();
      const obj = hydrateChecker(mock);
      expect(obj.__type).toEqual("Checker");
    });

    test("Rehydration with config", () => {
      const config: CheckerConfig = {
        permits: arr(1, 3).map(getPermitConfig),
      };
      const mock = getCheckerConfig(config);
      const obj = hydrateChecker(mock);
      expect(obj.__type).toEqual("Checker");
    });
  });

  describe("Permit", () => {
    test("Rehydration", () => {
      const mock = getPermitConfig();
      const obj = hydratePermit(mock);
      expect(obj.__type).toEqual("Permit");
    });

    test("Rehydration with config", () => {
      const config: PermitConfig = {
        name: "some permit",
        version: 32,
        decisions: arr(1, 3).map(getDecisionConfig),
      };
      const mock = getPermitConfig(config);
      const obj = hydratePermit(mock);
      expect(obj.__type).toEqual("Permit");
    });
  });

  describe("Decision", () => {
    test("Rehydration", () => {
      const mock = getDecisionConfig();
      const obj = hydrateDecision(mock);
      expect(obj.__type).toEqual("Decision");
    });

    test("Rehydration with config", () => {
      const inputs = arr(1, number(1, 5));
      const ruleConfig = { _maxInputConditions: inputs.length };
      const config: DecisionConfig = {
        id: "asdfasdf",
        inputs: inputs.map(() => fixedQuestionConfig),
        rules: arr(1, 3).map(() => getRuleConfig(ruleConfig)),
      };
      const mock = getDecisionConfig(config);
      const obj = hydrateDecision(mock);
      expect(obj.__type).toEqual("Decision");
    });
  });

  describe("Question", () => {
    test("Rehydration", () => {
      const obj = hydrateQuestion(getQuestionConfig());
      expect(obj.__type).toEqual("Question");
    });

    test("Rehydration with config", () => {
      const obj = hydrateQuestion(getQuestionConfig(fixedQuestionConfig));

      expect(obj).toMatchSnapshot();
    });
  });

  describe("Rule", () => {
    test("Rehydration", () => {
      const obj = hydrateRule(getRuleConfig());
      expect(obj.__type).toEqual("Rule");
      expect(obj.inputConditions.length).toBeGreaterThan(0);
    });

    test("Rehydration with config", () => {
      const obj = hydrateRule(getRuleConfig(fixedRuleConfig));
      expect(obj).toMatchSnapshot();
    });
  });
});
