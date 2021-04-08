import { Answer, AnswerType, ClientSimpleType } from "../types";
import { answerCollection, isSimpleType } from "../utils";

/**
 * A rule is a record in the decisionTable.
 * A rule has some conditions, if they match the given values
 * the rule evaluates to true.
 */
export default class Rule {
  readonly inputConditions: Answer[];
  readonly outputValue: ClientSimpleType;
  readonly description?: string;
  readonly __type = "Rule";
  readonly matchType = "any";

  /**
   * Constructor for Rule
   *
   * @param inputConditions the values inputs should have
   * @param outputValue the resulting value if this rule evaluates to true
   * @param description - A description for this rule. Can be used for outcome.
   */
  constructor(
    inputConditions: Answer[],
    outputValue: ClientSimpleType,
    description?: string
  ) {
    if (
      !Array.isArray(inputConditions) ||
      inputConditions.length === 0
      //  || !collectionOfSimpleTypes(inputConditions)
    ) {
      throw Error(
        "'inputConditions' on Rule should be an array with at least one real value."
      );
    }

    if (!isSimpleType(outputValue)) {
      throw Error("'outputValue' should be a number, boolean or string");
    }

    this.inputConditions = inputConditions;
    this.outputValue = outputValue;
    this.description = description;

    this.__type = "Rule";
  }

  /**
   * Find indexes of matching input conditions for provided values.
   *
   * @param values a list of values to compare with
   *
   * @returns indexes of matching values
   */
  // evaluateNew2(inputs: AnswerType[]): number[] {
  //   if (!answerCollection(inputs)) {
  //     throw Error(
  //       `'values' should be an array of answers, got ${JSON.stringify(inputs)}`
  //     );
  //   }

  //   const matchingConditionIndexes = [];
  //   for (let index = 0; index < this.inputConditions.length; index++) {
  //     const condition = this.inputConditions[index];

  //     if (condition === "-") {
  //       // the condition is ignored
  //       continue;
  //     }

  //     // if question.collection = true
  //     if (Array.isArray(condition)) {
  //       const input = inputs[index] as [];
  //       if (
  //         input.length !== condition.length ||
  //         !input.every((value, i) => value === condition[i])
  //       ) {
  //         return [];
  //       }
  //     } else {
  //       // condition is simple type
  //       if (inputs[index] !== condition) {
  //         return [];
  //       }
  //     }

  //     // current input matches the condition
  //     matchingConditionIndexes.push(index);
  //   }

  //   return matchingConditionIndexes;
  // }

  /**
   * Find indexes of matching input conditions for provided values.
   *
   * @param values a list of values to compare with
   *
   * @returns indexes of matching values
   */
  evaluateNew(values: AnswerType[]): number[] {
    if (!answerCollection(values)) {
      throw Error(
        `'values' should be an array of simple types, got ${JSON.stringify(
          values
        )}`
      );
    }
    const result = this.inputConditions.reduce(
      (acc: number[] | false, inputCondition, index) => {
        if (acc !== false && inputCondition !== "-") {
          // console.log("compare", curr, "with", values[index]);

          if (Array.isArray(inputCondition)) {
            const x = values[index] as [];
            if (
              inputCondition.length === x.length &&
              // AND support ??
              // inputCondition.every(function (value, i) {
              //   return value === x[i];
              // })
              // OR support
              inputCondition.find(function (value, i) {
                return value === x[i];
              })
            ) {
              acc.push(index);
            } else {
              acc = false;
            }
          } else {
            if (inputCondition === values[index]) {
              acc.push(index);
            } else {
              acc = false;
            }
          }
        }
        return acc;
      },
      []
    );

    return result === false ? [] : result;
  }
}
