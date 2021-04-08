import Decision from "./models/decision";
import Question from "./models/question";

export type Input = Question | Decision;
export type ClientSimpleType = boolean | string | number;
export type QuestionAnswer = ClientSimpleType | undefined;
export type Outcome = {
  outcome: string;
  title: string;
  description?: string;
};
// @TODO: make the client work with this predefined type
export type ClientOutcome =
  | "NEED_BOTH_PERMIT_AND_REPORT"
  | "NEED_CONTACT"
  | "NEED_PERMIT"
  | "NEED_REPORT"
  | "PERMIT_FREE";
