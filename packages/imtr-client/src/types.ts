import Decision from "./models/decision";
import Question from "./models/question";

export type Input = Question | Decision;
export type ClientSimpleType = boolean | string | number;
export type Answer = ClientSimpleType | undefined;
export type Outcome = {
  outcome: string;
  title: string;
  description?: string;
};
