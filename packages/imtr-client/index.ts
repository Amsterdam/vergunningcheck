export { getChecker } from "./src";

export type { Input, Answer } from "./src/types";
export type {
  Resolver,
  Answers,
  AutofillResolverMap,
  AutofillData,
} from "./src/models/checker";

export { default as Checker, imtrOutcomes } from "./src/models/checker";
export { default as Permit } from "./src/models/permit";
export { default as Decision } from "./src/models/decision";
export { default as Question } from "./src/models/question";
export { default as Rule } from "./src/models/rule";

export { addQuotes, removeQuotes } from "./src/utils";
