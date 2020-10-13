type ConfigSimpleType = boolean | string | number;

type ConfigQuestion = {
  autofill?: string;
  collection: boolean;
  description: string;
  id: string;
  longDescription: string;
  options: string[];
  prio: number;
  text: string;
  type: "string";  // geo / imtr-type from feel
  uuid?: string;
}

type ClientQuestionGeo = {
  // identification: string;
}

type ConfigRule = {
  inputConditions: ConfigSimpleType[];
  outputValue: ConfigSimpleType;
  description: string;
}

type ConfigInput = ConfigQuestion | ConfigDecision;

type ConfigDecision = {
  id: string;
  input: ConfigInput[];
  rules: ConfigRule[];
}

type ConfigDecisions = {
  [id: string]: ConfigDecision;
}

type ConfigInputs = {
  [id: string]: ConfigInput;
}

type Config = {
  decisions: ConfigDecisions;
  inputs: ConfigInputs;
  name: string;
  questions: ConfigQuestion[];
}
