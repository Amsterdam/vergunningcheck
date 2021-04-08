import isNumber from "lodash.isnumber";
import isString from "lodash.isstring";
import { ClientSimpleType } from "../types";

import { collectionOfType } from "../utils";
import Decision from "./decision";
import Question from "./question";

export type PermitProps = {
  name: string;
  version: number;
  decisions: Decision[];
};

/**
 * Step checker class for permits
 */
export default class Permit {
  readonly name: string;
  readonly version: number;
  readonly questions: Question[];
  readonly decisions: Decision[];
  readonly __type = "Permit";

  /**
   * Constructor for Checker
   *
   * @param name - A name for this checker
   * @param version - imtr version number
   * @param decisions - Decisions for permmits
   */
  constructor({ name, version, decisions }: PermitProps) {
    if (!isString(name)) {
      throw Error(`'name' must be a String, (got ${name})`);
    }
    if (!isNumber(version) || version < 1) {
      throw Error("'version' must be a Number >= 1");
    }
    if (!collectionOfType(decisions, "Decision")) {
      throw Error("'decisions' must be an array of type 'Decision'");
    }
    this.name = name;
    this.version = version;
    this.questions = decisions.flatMap((decision) => decision.getQuestions());
    this.decisions = decisions;
  }

  getDecisionById(id: string): Decision | undefined {
    return this.decisions.find((d) => d.id === id);
  }

  /**
   * Find output of matching rule for decision with a specific id
   *
   * @returns the output of the decision
   */
  getOutputByDecisionId(decisionId: string): ClientSimpleType | undefined {
    const decision = this.getDecisionById(decisionId);
    if (!decision) {
      throw Error(
        `'getOutputByDecisionId' failed to find decisionId '${decisionId}'`
      );
    }
    return decision.getOutput();
  }
}
