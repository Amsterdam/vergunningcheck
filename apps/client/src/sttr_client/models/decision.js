import isString from "lodash.isstring";
import { collectionOfType, uniqueFilter } from "../util";

/**
 * A Decision in DMN is basically a table with inputs as columns
 * and records / lines as rules.
 * If one of the rules is definitive the decision is final. (hitrate=any)
 * So order of rules doesn't matter.
 * Every rule has 1 output.
 * A decision can be an input for another decision with it's own rules.
 *
 * @typedef {import('./rule')} Rule
 * @typedef {import('./question')} Question
 */
class Decision {
  /**
   * Constructs a Decision
   *
   * @param {string} id - unique identifier
   * @param {(Question[]|Decision[])} inputs - the Input requirements
   * @param {Rule[]} rules - the Rule's from the decision table
   */
  constructor(id, inputs, rules) {
    if (!isString(id)) {
      throw Error("'id' must be a String");
    }
    if (
      !collectionOfType(inputs, "Decision") &&
      !collectionOfType(inputs, "Question")
    ) {
      throw Error(
        `'inputs' must be an array of Question's or Decision's, got: ${inputs} for Decision: ${id}.`
      );
    }
    if (!Array.isArray(rules) || !collectionOfType(rules, "Rule")) {
      throw Error(
        `'rules' must be an array of type 'Rule' (got ${JSON.stringify(rules)})`
      );
    }
    this._id = id;
    this._inputs = inputs;
    this._rules = rules;

    this.__type = "Decision";
  }

  get id() {
    return this._id;
  }

  /**
   * Return the outputValue for the first matching rule
   */
  get answer() {
    const matchingRule = this.getMatchingRules().shift() || null;
    return matchingRule ? matchingRule.outputValue : null;
  }

  /**
   * Get all matching rules
   *
   * @returns {Rule[]} the rules
   */
  getMatchingRules(inputReducer) {
    // Find the values for our inputs
    const inputs = inputReducer ? this._inputs.map(inputReducer) : this._inputs;
    const values = inputs.map(({ answer }) => answer);
    return this._rules.filter((rule) => rule.evaluateNew(values).length !== 0);
  }

  /**
   * Find inputs (Questions or Decisions) that are decisive for (the set of rules?)
   *
   * @returns {Decision[]|Question[]} the decisive inputs
   */
  getDecisiveInputs() {
    const values = this._inputs.map(({ answer }) => answer);
    return this._rules
      .flatMap((rule) =>
        rule.evaluateNew(values).map((index) => this._inputs[index])
      )
      .filter(uniqueFilter);
  }

  /**
   * Get the inputs for this decision
   *
   * @returns {Question[]} the unfiltered inputs
   */
  getQuestions() {
    return this._inputs.filter((input) => input.__type === "Question");
  }

  /**
   * Find the matching rule for one decision and return it's outputValue.
   *
   * @returns {string|undefined} - the outputValue of the matching rule or undefined
   */
  getOutput() {
    const rule = this.getMatchingRules().shift();
    return rule ? rule.outputValue : undefined;
  }
}

export default Decision;
