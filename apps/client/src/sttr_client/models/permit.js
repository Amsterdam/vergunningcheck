import isNumber from "lodash.isnumber";
import isString from "lodash.isstring";

import { collectionOfType } from "../../utils";

/**
 * Step checker class for quiz
 *
 * @typedef {import('./decision')} Decision
 * @typedef {import('./question')} Question
 *
 * @property {Question[]} _questions - an internally used list of questions
 * @property {Decision[]} _decision - an internally used list of decisions
 */
class Permit {
  /**
   * Constructor for Checker
   *
   * @param {string} name - A name for this checker
   * @param {Number} version - STTR version number
   * @param {Decision[]} decisions - Decisions for this quiz
   */
  constructor(name, version, decisions) {
    if (!isString(name)) {
      throw Error("'name' must be a String");
    }
    if (!isNumber(version) || version < 1) {
      throw Error("'version' must be a Number >= 1");
    }
    if (!collectionOfType(decisions, "Decision")) {
      throw Error("'decisions' must be an array of type 'Decision'");
    }
    this.name = name;
    this._version = version;
    this._questions = decisions.flatMap((decision) => decision.getQuestions());
    this._decisions = decisions;

    this.__type = "Permit";
  }

  getDecisionById(id) {
    return this._decisions.find((d) => d.id === id);
  }

  get questions() {
    return this._questions;
  }

  get version() {
    return this._version;
  }

  /**
   * Find output of matching rule for decision with a specific id
   *
   * @param {string} id - The decision id.
   * @returns {(string|undefined)[]} the resulting output
   */
  getOutputByDecisionId(id) {
    const decision = this.getDecisionById(id);
    if (!decision) {
      throw Error(`'getOutputByDecisionId' failed to find id '${id}'`);
    }
    return decision.getOutput();
  }
}

export default Permit;
