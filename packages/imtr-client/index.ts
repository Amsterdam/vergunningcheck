export { getChecker } from "./src";

export type { AnswerType, Answer, ClientSimpleType, Input } from "./src/types";
export type {
  Answers,
  AutofillData,
  AutofillResolverMap,
  Resolver,
} from "./src/models/checker";

export {
  default as Checker,
  ClientOutcomes,
  outcomes,
} from "./src/models/checker";
export { default as Decision } from "./src/models/decision";
export { default as Permit } from "./src/models/permit";
export { default as Question } from "./src/models/question";
export { default as Rule } from "./src/models/rule";

export { addQuotes, removeQuotes } from "./src/utils";
