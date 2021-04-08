import isNumber from "lodash.isnumber";
import isString from "lodash.isstring";
import { QuestionAnswer, ClientSimpleType } from "../types";

import { collectionOfType } from "../utils";

const DESC_MAX_LENGTH = 2048;

export const questionTypes = ["boolean", "string"];

export type QuestionType = "string" | "boolean";
export type QuestionAutofill = string;
export type QuestionDescription = string;
export type QuestionLongDescription = string;
export type QuestionId = string;
export type QuestionOption = string;
export type QuestionOptions = QuestionOption[];
export type QuestionPrio = number;
export type QuestionText = string;
export type QuestionUUID = string;

/**
 * @param answer the values inputs should have
 * @param autofill - name of autofill requirement
 * @param description - a description for this question (mind the max-length)
 * @param id -
 * @param longDescription - a longer description for this question (mind the max-length)
 * @param options - a list of options for the answer
 * @param prio -
 * @param text - the question itself
 * @param type - data type of the question, eg. 'boolean', or 'geo'
 * @param uuid -
 */
export type QuestionProps = {
  answer?: QuestionAnswer;
  autofill?: QuestionAutofill;
  description?: QuestionDescription;
  id: QuestionId;
  longDescription?: QuestionLongDescription;
  options?: QuestionOptions;
  prio: QuestionPrio;
  text: QuestionText;
  type: QuestionType;
  uuid?: QuestionUUID;
};

/**
 * A Question
 */
export default class Question {
  private _answer?: QuestionAnswer;

  readonly __type = "Question";
  readonly autofill?: string;
  readonly description?: string;
  readonly id: string;
  readonly longDescription?: string;
  readonly options: string[] | undefined;
  readonly prio: number;
  readonly text: string;
  readonly type: string;
  readonly uuid?: string;

  constructor({
    answer,
    autofill,
    description,
    id,
    longDescription,
    options,
    prio,
    text,
    type,
    uuid,
  }: QuestionProps) {
    if (id !== undefined && !isString(id)) {
      throw Error(`'id' for Question must be a string (got "${id}"`);
    }
    if (questionTypes.indexOf(type) === -1) {
      throw Error(`Unsupported type for Question (${type})`);
    }
    if (text !== undefined && !isString(text)) {
      throw Error(`'text' for Question must be a string (got "${text}"`);
    }
    if (autofill !== undefined && !isString(autofill)) {
      throw Error(
        `'autofill' for Question must be a string (got "${autofill}"`
      );
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

    this.id = id;
    this.type = type;
    this.text = text;
    this.uuid = uuid;
    this.prio = prio;
    this.autofill = autofill;
    this.options = options ? options.map((val) => `"${val}"`) : undefined;
    this.description = description;
    this.longDescription = longDescription;

    if (answer !== undefined) {
      this.setAnswer(answer);
    }
  }
  // plugin:@typescript-eslint/recommended
  // eslint@typescript-eslint/explicit-module-boundary-types

  get answer(): QuestionAnswer {
    return this._answer;
  }

  setAnswer(value: ClientSimpleType): void {
    /* eslint-disable valid-typeof */
    if (this.type === "geo") {
      // temporary fix to make current checkers work:
      // throw Error(`'geo' is not yet supported.`);
    } else if (
      this.options &&
      (typeof value !== "string" || !this.options.includes(value))
    ) {
      throw Error(
        `value for setAnswer must be in options ${this.options}, got '${value}'`
      );
    } else if (typeof value !== this.type) {
      throw Error(
        `value for setAnswer must be of type ${this.type}, got '${value}'`
      );
    }
    /* eslint-enable valid-typeof */

    this._answer = value;
  }
}
