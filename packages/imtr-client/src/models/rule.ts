import { AnswerType, ClientSimpleType } from "../types";
import { collectionOfSimpleTypes, isSimpleType } from "../utils";

/**
 * A rule is a record in the decisionTable.
 * A rule has some conditions, if they match the given values
 * the rule evaluates to true.
 */
export default class Rule {
  readonly inputConditions: ClientSimpleType[];
  readonly outputValue: ClientSimpleType;
  readonly description?: string;
  readonly __type = "Rule";

  /**
   * Constructor for Rule
   *
   * @param inputConditions the values inputs should have
   * @param outputValue the resulting value if this rule evaluates to true
   * @param description - A description for this rule. Can be used for outcome.
   */
  constructor(
    inputConditions: ClientSimpleType[],
    outputValue: ClientSimpleType,
    description?: string
  ) {
    if (
      !Array.isArray(inputConditions) ||
      inputConditions.length === 0 ||
      !collectionOfSimpleTypes(inputConditions)
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
  evaluateNew(values: AnswerType[]): number[] {
    // XXX: `collectionOfSimpleTypes` doesn't work for the new `values`
    // `values` can now be `[["Answer 1", "Answer 2"], ["Answer 3"]]` instead of ["Answer 1", "Answer 2", "Answer 3"]
    if (!collectionOfSimpleTypes(values)) {
      throw Error(
        `'values' should be an array of simple types, got ${JSON.stringify(
          values
        )}`
      );
    }

    const result = this.inputConditions.reduce(
      (acc: number[] | false, curr, index) => {
        if (acc !== false && curr !== "-") {
          if (curr === values[index]) {
            acc.push(index);
          } else {
            acc = false;
          }
        }
        return acc;
      },
      []
    );

    return result === false ? [] : result;
  }
}
