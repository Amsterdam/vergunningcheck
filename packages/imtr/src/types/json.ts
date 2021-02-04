// export type JSONChecker = {
//   id: string;
//   permits: JSONPermit[];
// }

export type JSONPermit = {
  decisions: JSONDecisions;
  inputs?: JSONInputs;
  name: string;
  questions: JSONQuestion[];
};

// export type JSONVersionedPermit = JSONPermit | {
//   version: number;
// }

export type JSONOption = string;

export type JSONQuestion = {
  autofill: "monumentBoolean" | "monumentList" | "cityScape";
  id: string;
  options: JSONOption[];
  prio: number;
  text: string;
  type: "boolean" | "string" | "geo";
  uuid?: string;
};

export type JSONInputs = {
  [id: string]: JSONInput;
};

export type JSONInput = {
  href: string;
  type: string;
};

export type JSONDecisions = {
  // "dummy": JSONDecision;
  [id: string]: JSONDecision;
};

export type JSONDecision = {
  decisionTable: JSONDecisionTable;
  requiredInputs?: string[];
  requiredDecisions?: string[];
};

export type JSONDecisionTable = {
  rules: JSONRule[];
};

export type JSONRule = {
  description?: string;
  inputs: JSONRuleInput[];
  output: string;
};

export type JSONRuleInput = boolean | string;
