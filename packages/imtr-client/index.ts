export { getChecker } from "./src";

export type { Answer, Input } from "./src/types";
export type {
  Answers,
  AutofillData,
  AutofillResolverMap,
  Resolver,
} from "./src/models/checker";

export {
  default as Checker,
  clientOutcomes,
  imtrOutcomes,
} from "./src/models/checker";
export { default as Decision } from "./src/models/decision";
export { default as Permit } from "./src/models/permit";
export { default as Question } from "./src/models/question";
export { default as Rule } from "./src/models/rule";

export { addQuotes, removeQuotes } from "./src/utils";
