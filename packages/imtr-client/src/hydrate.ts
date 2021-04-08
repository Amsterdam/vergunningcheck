import { Rule, Question, Decision, Permit, Checker } from "..";
import {
  QuestionAutofill,
  QuestionDescription,
  QuestionId,
  QuestionLongDescription,
  QuestionOption,
  QuestionPrio,
  QuestionText,
  QuestionType,
  QuestionUUID,
} from "./models/question";
import { QuestionAnswer, ClientSimpleType } from "./types";

export type CheckerConfig = {
  permits: PermitConfig[];
};

export type PermitConfig = {
  name: string;
  version: number;
  decisions: DecisionConfig[];
};

export type DecisionConfig = {
  id: string;
  inputs: QuestionConfig[] | [DummyConfig];
  rules: RuleConfig[];
};

export type RuleConfig = {
  inputConditions: ClientSimpleType[];
  outputValue: ClientSimpleType;
  description?: string;
};

type QuestionOptions = QuestionOption[];
export type QuestionConfig = {
  answer?: QuestionAnswer;
  autofill?: QuestionAutofill;
  description?: QuestionDescription;
  id: QuestionId;
  longDescription?: QuestionLongDescription;
  options?: QuestionOptions;
  prio: QuestionPrio;
  text: QuestionText;
  type: QuestionType;
  uuid?: QuestionUUID;
};

export type DummyConfig = DecisionConfig;

export const hydrateRule = (config: RuleConfig): Rule => new Rule(config);

export const hydrateQuestion = (config: QuestionConfig): Question =>
  new Question(config);

export const hydrateDecision = ({
  id,
  inputs,
  rules,
}: DecisionConfig): Decision =>
  new Decision({
    id,
    inputs: (inputs as (QuestionConfig | DummyConfig)[]).map((input) => {
      if (id === "dummy") {
        return hydrateDecision(input as DecisionConfig);
      }
      return hydrateQuestion(input as QuestionConfig);
    }),
    rules: rules.map(hydrateRule),
  });

export const hydratePermit = ({
  decisions,
  name,
  version,
}: PermitConfig): Permit =>
  new Permit({
    decisions: decisions.map(hydrateDecision),
    name,
    version,
  });

export const hydrateChecker = ({ permits }: CheckerConfig): Checker =>
  new Checker({
    permits: permits.map(hydratePermit),
  });
