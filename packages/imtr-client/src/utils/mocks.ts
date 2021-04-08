import faker from "faker/locale/nl";
import { addQuotes } from ".";
import {
  CheckerConfig,
  PermitConfig,
  DecisionConfig,
  QuestionConfig,
  RuleConfig,
  DummyConfig,
} from "../hydrate";
import { QuestionType, questionTypes } from "../models/question";

/**
 * - pr afmaken voor vragen volgorde
 * daarvoor heb ik goeie tests nodig om te garenderen dat het blijft kloppen
 *
 * daarnaast kan dit natuurlijk supergoed gebruikt worden door de json file
 * ik heb nu dit hieronder + imtr-client.getChecker maar dat kan mogelijk
 * dichter bij elkaar.
 */

export const words = (number?: number): string =>
  faker.random.words(number ?? 3);

export const number = (min: number, max: number): number =>
  faker.random.number({ max, min });

export const arr = (min: number, max: number): undefined[] =>
  new Array(number(min, max)).fill(undefined);

export type PartialDummyConfig = Partial<DummyConfig>;

export type PartialRuleConfig = Partial<RuleConfig>;
export type PartialQuestionConfig = Partial<QuestionConfig>;
export type PartialDecisionConfig = Partial<
  DecisionConfig & {
    inputs: PartialQuestionConfig[] | [PartialDummyConfig];
    rules: PartialRuleConfig[];
  }
>;
export type PartialPermitConfig = Partial<
  PermitConfig & {
    decisions: PartialDecisionConfig[];
  }
>;
export type PartialCheckerConfig = Partial<
  CheckerConfig & {
    permits: PartialPermitConfig[];
  }
>;

export const getCheckerConfig = (
  config: PartialCheckerConfig = {}
): CheckerConfig => {
  return {
    permits: arr(1, 3).map(getPermitConfig),
    ...config,
  };
};

export const getPermitConfig = (
  config: PartialPermitConfig = {}
): PermitConfig => {
  return {
    name: `${faker.lorem.word()} Checker`,
    version: number(1, 80),
    decisions: arr(1, 3).map(getDecisionConfig),
    ...config,
  };
};

export const getDecisionConfig = (
  config: PartialDecisionConfig = {}
): DecisionConfig => {
  const maxInputs = number(1, config?.inputs?.length || 4);
  const inputs = arr(1, maxInputs);
  return {
    id: faker.random.uuid(),
    inputs: inputs.map(getQuestionConfig),
    rules: arr(1, 3).map(() =>
      getRuleConfig({ _maxInputConditions: inputs.length })
    ),
    ...config,
  };
};

export const getQuestionConfig = (
  config: PartialQuestionConfig = {}
): QuestionConfig => {
  const type =
    config.type || (faker.helpers.randomize(questionTypes) as QuestionType);
  const options =
    config.options !== undefined
      ? config.options
      : type !== "boolean"
      ? arr(2, 4).map(() => words())
      : undefined;
  const answer =
    config.answer || type === "boolean"
      ? faker.helpers.randomize([faker.random.boolean(), undefined])
      : options
      ? faker.helpers.randomize([...options.map(addQuotes), undefined])
      : faker.lorem.sentence();

  return {
    answer,
    autofill: faker.helpers.randomize([
      "monumentBoolean",
      "cityScape",
      undefined,
    ]),
    description: faker.helpers.randomize([faker.lorem.sentence(), undefined]),
    id: faker.random.uuid(),
    longDescription: `${faker.lorem.sentence()}
    ![${faker.random.words()}][https://lorempixel.com/400/200]
    [https://lorempixel.com/400/200](https://lorempixel.com/400/200)
    `,
    options,
    prio: number(0, 15) * 10,
    text: faker.lorem.sentence() + "?",
    type,
    uuid: faker.helpers.randomize([faker.random.words(), undefined]),
    ...config,
  };
};

export const getRuleConfig = (
  config: Partial<RuleConfig & { _maxInputConditions: number }> = {}
): RuleConfig => {
  const maxInputs = config._maxInputConditions ?? 3;
  return {
    inputConditions: arr(1, maxInputs).map(faker.random.boolean),
    outputValue: faker.helpers.randomize([3, true, false, "yes", "no", "-"]),
    description: faker.helpers.randomize([undefined, faker.lorem.sentence()]),
    ...config,
  };
};
