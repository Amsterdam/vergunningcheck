import { isSimpleType, collectionOfSimpleTypes } from "../../utils";

/**
 * A rule is a record in the decisionTable.
 * A rule has some conditions, if they match the given values
 * the rule evaluates to true.
 */
class Rule {
  /**
   * Constructor for Rule
   *
   * @param {(boolean|string|number)[]} inputConditions the values inputs should have
   * @param {(boolean|string|number)} outputValue the resulting value if this rule evaluates to true
   * @param {string} [description] - A description for this rule. Can be used for conclusion.
   */
  constructor(inputConditions, outputValue, description) {
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
    this._inputConditions = inputConditions;
    this._outputValue = outputValue;
    this._description = description;

    this.__type = "Rule";
  }

  get description() {
    return this._description;
  }

  get inputConditions() {
    return this._inputConditions;
  }

  get outputValue() {
    return this._outputValue;
  }

  /**
   * Find indexes of matching input conditions for provided values.
   *
   * @param {(boolean|string|number)[]} values a list of values to compare with
   * @returns {number[]} indexes of matching values
   */
  evaluateNew(values) {
    if (!collectionOfSimpleTypes(values)) {
      throw Error(`'values' should be an array of simple types, got ${values}`);
    }
    const result = this.inputConditions.reduce((acc, curr, index) => {
      let res = acc;
      if (acc === false) return false;
      if (curr !== "-") {
        if (curr === values[index]) {
          res.push(index);
        } else {
          res = false;
        }
      }
      return res;
    }, []);
    return result === false ? [] : result;
  }
}

export default Rule;
