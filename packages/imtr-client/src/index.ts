/* Do import from json.ts directly because importing from imtr/index.ts doesn't work
 * because of Deno's way of importing scripts
 */
import type {
  JSONChecker,
  JSONDecisionTable,
  JSONQuestion,
} from "@vergunningcheck/imtr-lib";

import Checker from "./models/checker";
import Decision from "./models/decision";
import Permit from "./models/permit";
import Question from "./models/question";
import Rule from "./models/rule";

type QuestionConfig = {
  question: Question;
  ids: string[];
};

/**
 * Build Question array from json config
 *
 * @param questionConfig - The questions from json config
 * @returns an array with Question objects including extra ids property
 */
export const getQuestions = (
  questionConfig: JSONQuestion[]
): QuestionConfig[] => {
  return questionConfig.map(
    ({
      id,
      uuid,
      text,
      type, // collection,
      options,
      autofill,
      description,
      longDescription,
      ids,
      prio,
    }) => ({
      ids,
      question: new Question({
        id,
        type,
        text,
        description,
        longDescription,
        // collection,
        options,
        autofill,
        uuid,
        prio,
      }),
    })
  );
};

export type FUDecision = {
  decisionTable: JSONDecisionTable;
  requiredInputs?: string[];
  requiredDecisions?: string[] | Decision[];
};

/**
 * Build Decision array from json config. Decisions have a reference
 * to the Question object so that is required input too.
 *
 * @param id - Unique identifier for the decision
 * @param decisionConfig - The decisions from json config
 * @param questions - List of all the questions
 * @returns an array with Decision objects
 */
const getDecision = (
  id: string,
  decisionConfig: FUDecision,
  questions: QuestionConfig[]
): Decision => {
  const { requiredInputs, decisionTable, requiredDecisions } = decisionConfig;

  if (!requiredInputs && !requiredDecisions) {
    throw Error("Either 'requiredInputs' or 'requiredDecisions' are needed");
  }

  const inputs =
    requiredInputs?.map((href) => {
      const res = questions.find((q) =>
        q.ids.includes(href.replace("#input_", "uitv_"))
      );
      if (!res) {
        throw Error("Question not found");
      }
      return res.question;
    }) || (requiredDecisions as Decision[] | Question[]);

  return new Decision({
    id,
    inputs,
    rules: decisionTable.rules.map(
      ({ inputs: ruleInputs, output, description }) =>
        new Rule({
          inputConditions: ruleInputs,
          outputValue: output,
          description,
        })
    ),
  });
};

/**
 * Create a Checker object
 *
 * @param config - the config coming from json
 * @returns the new Checker object
 */
export const getChecker = (config: JSONChecker): Checker => {
  const { permits: permitsConfig } = config;
  if (!permitsConfig || permitsConfig.length === 0) {
    throw new Error("Permits cannot be empty.");
  }
  const x = permitsConfig.reduce((acc, permitConfig) => {
    permitConfig.questions.forEach((question) => {
      const previousByUUID = question.uuid
        ? acc.find((q) => q.uuid === question.uuid)
        : null;

      if (previousByUUID) {
        if (question.prio < previousByUUID.prio) {
          // If new question has lower prio (more important) to override the value in our accumulator
          previousByUUID.prio = question.prio;
        }
        previousByUUID.ids.push(question.id);
      } else {
        acc.push({ ...question, ids: [question.id] });
      }
    });

    return acc;
  }, [] as JSONQuestion[]);

  const allQuestions = getQuestions(x);
  const permits = permitsConfig.map((permit) => {
    const { name, version, questions, decisions } = permit;

    const decisionConfigs = Object.entries(decisions);
    if (decisionConfigs.length === 0) {
      throw Error("'decisions' should not be empty.");
    }
    if (questions.length === 0) {
      throw Error("'questions' should not be empty.");
    }

    const simpleDecisions = decisionConfigs
      .filter(([, json]) => !json.requiredDecisions) // filter out complex-decisions
      .map(([id, json]) => getDecision(id, json, allQuestions));

    const complexDecisions = decisionConfigs
      .filter(([, json]) => !!json.requiredDecisions) // only get complex ones
      .map(([id, json]) => {
        const requiredDecisions = (json.requiredDecisions as string[]).map(
          (href) => simpleDecisions.find((sd) => sd.id === href.substring(1))
        ) as Decision[];
        const decisionConfig: FUDecision = { ...json, requiredDecisions };
        return getDecision(id, decisionConfig, allQuestions);
      });

    const result = new Permit({
      name,
      version,
      decisions: [...simpleDecisions, ...complexDecisions],
    });
    return result;
  });

  const checker = new Checker({ permits });

  return checker;
};
