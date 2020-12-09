import isString from "lodash.isstring";
import { ClientSimpleType, Input } from "../types";

import { collectionOfType } from "../utils";
import Question from "./question";
import Rule from "./rule";

export type InputReducer = (input: Input) => Input | null;

/**
 * A Decision in DMN is basically a table with inputs as columns
 * and records / lines as rules.
 * If one of the rules is definitive the decision is final. (hitrate=any)
 * So order of rules doesn't matter.
 * Every rule has 1 output.
 * A decision can be an input for another decision with it's own rules.
 */
export default class Decision {
  readonly id;
  readonly inputs;

  readonly rules;
  readonly __type = "Decision";

  /**
   * Constructs a Decision
   *
   * @param id - unique identifier
   * @param inputs - the Input requirements
   * @param rules - the Rule's from the decision table
   */
  constructor(id: string, inputs: Input[], rules: Rule[]) {
    if (!isString(id)) {
      throw Error("'id' must be a String");
    }
    if (
      !collectionOfType(inputs, "Decision") &&
      !collectionOfType(inputs, "Question")
    ) {
      throw Error(
        `'inputs' must be an array of Question's or Decision's, got: '${inputs}' for Decision: ${id}.`
      );
    }
    if (!Array.isArray(rules) || !collectionOfType(rules, "Rule")) {
      throw Error(
        `'rules' must be an array of type 'Rule' (got ${JSON.stringify(rules)})`
      );
    }
    this.id = id;
    this.inputs = inputs;
    this.rules = rules;
  }

  /**
   * Return the outputValue for the first matching rule
   */
  get answer(): ClientSimpleType | null {
    return this.getMatchingRules().shift()?.outputValue || null;
  }

  getMatchingRules(inputReducer?: InputReducer): Rule[] {
    // Find the values for our inputs
    const inputs = inputReducer ? this.inputs.map(inputReducer) : this.inputs;
    const values = inputs.map((input) => input?.answer);
    return this.rules.filter((rule) => rule.evaluateNew(values).length !== 0);
  }

  /**
   * Find inputs (Questions or Decisions) that are decisive for (the set of rules?)
   * @returns the decisive inputs
   */
  getDecisiveInputs(): Input[] {
    const values = this.inputs.map(({ answer }) => answer);
    const rules = this.rules.flatMap((rule) =>
      rule.evaluateNew(values).map((index) => this.inputs[index])
    );
    return [...new Set(rules)]; // unique set of rules
  }

  /**
   * Get the inputs for this decision
   */
  getQuestions = (): Question[] =>
    this.inputs.filter((input) => input.__type === "Question") as Question[];

  /**
   * Find the matching rule for one decision and return it's outputValue.
   * @returns the outputValue of the matching rule or undefined
   */
  getOutput = (): ClientSimpleType | undefined =>
    this.getMatchingRules().shift()?.outputValue;
}
