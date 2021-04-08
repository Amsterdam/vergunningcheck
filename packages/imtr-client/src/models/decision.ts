import isString from "lodash.isstring";
import { AnswerType, ClientSimpleType, Input } from "../types";

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
        `'inputs' must be an array of Question's or Decision's, got: '${JSON.stringify(
          inputs
        )}' for Decision: ${id}.`
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
  get answer(): AnswerType {
    return this.getMatchingRules().shift()?.outputValue || undefined;
  }

  // getAnswerSets() {
  //   const answers = [
  //     // from args?
  //     ["a", "b"], // or!
  //     ["c", "d"], // and!
  //     "e",
  //   ];
  //   return [
  //     [["a"], ["c", "d"], "e"],
  //     [["b"], ["c", "d"], "e"],
  //   ];
  // }

  getMatchingRules(inputReducer?: InputReducer): Rule[] {
    // Find the relevant inputs
    const inputs = inputReducer ? this.inputs.map(inputReducer) : this.inputs;
    // inputs.map(input => {
    //   if (Array.isArray(input?.answer)) {
    //     input?.answer.map(answer => {
    //       answer
    //     })
    //   }
    // });

    // return this.rules.filter((rule) => {
    //   for (let j = 0; j < inputs.length; j++) {
    //     const answer = inputs[j].answer;

    //     // if (Array.isArray(answer)) {
    //     //   for (let i = 0; i < answer.length; i++) {
    //     //     if (rule.evaluateNew([answer[i]])) {
    //     //       return true;
    //     //     }
    //     //   }
    //     // } else {
    //       rule.evaluateNew(answer);
    //     // }
    //   }
    //   return false;
    // });

    // Find the values for our inputs
    const values = inputs.map((input) => input?.answer);

    return this.rules.filter((rule) => rule.evaluateNew(values).length !== 0);
    // // XXX: this needs to be fixed
    // return this.rules.filter((rule) => {
    //   // If collection...
    //   if (Array.isArray(values)) {
    //     console.log("hier 1");
    //     return values.find((val: any) => rule.evaluateNew(val).length !== 0);
    //   } else {
    //     console.log("hier 2");
    //     return rule.evaluateNew(values).length !== 0;
    //   }
    // });

    // return this.rules.filter((rule) => {
    //   // TODO implement difference of rules matchin all values or partial sets
    //   // DMN has support for this.
    //   if (rule.matchType !== "any") { // XXX or input.type = 'any'...
    //     throw Error("rule.matchType !== 'any' is not implemented.");
    //   }
    //   inputs.map((input) => {
    //     if (input?.collection) {
    //       input?.answer.forEach(answer => {

    //       });) rule
    //       rule.evaluateNew(values).length !== 0;
    //     }
    //   })
  }

  /**
   * Find inputs (Questions or Decisions) that are decisive for (the set of rules?)
   *
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
