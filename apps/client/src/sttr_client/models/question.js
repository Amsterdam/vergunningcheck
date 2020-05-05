import isString from "lodash.isstring";
import { collectionOfType } from "../util";
import isNumber from "lodash.isnumber";

const DESC_MAX_LENGTH = 2048;

// interface QuestionProps {
//   id: string;
//   type: string;
//   text: string;
//   description: string;
//   answer: string | boolean | number | string[];
//   options: string[];
//   uuid: string;
//   multipleAnswers: boolean;
// }

/**
 * A Question ...
 *
 */
class Question {
  // private _id: string;
  // private _type: string;
  // private _text: string;
  // private _uuid: string;
  // private _multipleAnswers: boolean;
  // private _options: string[] | undefined;
  // private _description: string;
  // private __type: string;

  /**
   * @param {string} type - data type of the question, eg. 'boolean', or 'geo'
   * @param {string} text - the question itself
   * @param {string} [description] - a description for this question (mind the max-length)
   * @param {string} [longDescription] - a longer description for this question (mind the max-length)
   * @param {(boolean|string|number|string[])} [answer] the values inputs should have
   * @param {string[]} [options] a list of options for the answer
   * @param {boolean} [multipleAnswers=false] indicates if answer should be a list
   */
  constructor({
    id,
    type,
    text,
    description,
    longDescription,
    answer,
    options,
    uuid,
    prio,
    multipleAnswers = false,
  }) {
    if (id !== undefined && !isString(id)) {
      throw Error(`'id' for Question must be a string (got "${id}"`);
    }
    if (["boolean", "string", "number", "geo"].indexOf(type) === -1) {
      throw Error(`Unsupported type for Question (${type})`);
    }
    if (text !== undefined && !isString(text)) {
      throw Error(`'text' for Question must be a string (got "${text}"`);
    }
    if (prio === undefined || !isNumber(prio)) {
      throw Error(`'prio' for Question must be a number (got "${prio}"`);
    }
    if (
      description !== undefined &&
      (!isString(description) || [...description].length > DESC_MAX_LENGTH)
    ) {
      throw Error(
        `'description' must be a string with max. ${DESC_MAX_LENGTH} chars`
      );
    }
    if (
      longDescription !== undefined &&
      (!isString(longDescription) ||
        [...longDescription].length > DESC_MAX_LENGTH)
    ) {
      throw Error(
        `'longDescription' must be a string with max. ${DESC_MAX_LENGTH} chars`
      );
    }
    if (uuid !== undefined && !isString(uuid)) {
      throw Error(`'uuid' for Question must be a string`);
    }
    if (options !== undefined && !collectionOfType(options, "String")) {
      throw Error(`Options must be array of String's`);
    }
    if (multipleAnswers) {
      throw Error(
        `Current implementation doesn't support multipleAnswers yet.`
      );
    }

    this._id = id;
    this._type = type;
    this._text = text;
    this._uuid = uuid;
    this._prio = prio;
    this._multipleAnswers = multipleAnswers;
    this._options = options ? options.map((val) => `"${val}"`) : undefined;
    this._description = description;
    this._longDescription = longDescription;
    if (answer !== undefined) {
      this.setAnswer(answer);
    }

    this.__type = "Question";
  }

  get id() {
    return this._id;
  }

  get prio() {
    return this._prio;
  }

  get uuid() {
    return this._uuid;
  }

  get type() {
    return this._type;
  }

  get text() {
    return this._text;
  }

  get options() {
    return this._options;
  }

  get description() {
    return this._description;
  }

  get longDescription() {
    return this._longDescription;
  }

  setAnswer(value) {
    /* eslint-disable valid-typeof */
    if (this._type === "geo") {
      // temporary fix to make current checkers work:
      // throw Error(`'geo' is not yet supported.`);
    } else if (this._multipleAnswers) {
      throw Error(`'multipleAnswers' is not yet supported.`);
      //   // for now we only support string in answer[]
      //   if (!collectionOfType(value, 'String')) {
      //     throw Error(`value for 'setAnswer' must be of type ${this._type}[], got '${value}'`);
      //   }
      //   if (this._options) {
      //     if (value.find(val => !this._options.includes(val))) {
      //       throw Error(`value for setAnswer must be in options ${this._options}, got '${value}'`);
      //     }
      //   }
    } else if (this._options && !this._options.includes(value)) {
      throw Error(
        `value for setAnswer must be in options ${this._options}, got '${value}'`
      );
    } else if (typeof value !== this._type) {
      throw Error(
        `value for setAnswer must be of type ${this._type}, got '${value}'`
      );
    }
    /* eslint-enable valid-typeof */

    this._answer = value;
  }

  get answer() {
    return this._answer;
  }
}

export default Question;
