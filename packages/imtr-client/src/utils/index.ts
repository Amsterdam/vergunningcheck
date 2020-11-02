import isBoolean from "lodash.isboolean";
import isNumber from "lodash.isnumber";
import isString from "lodash.isstring";

// Array checks
export const collectionOfSimpleTypes = (col: unknown[]): boolean =>
  Array.isArray(col) && !col.find((val) => !isSimpleType(val));

export const collectionOfType = (col: unknown[], type: string): boolean => {
  if (!Array.isArray(col) || col.includes(undefined) || col.includes(null)) {
    return false;
  }
  const itemOfInvaldType = col.find(
    (val) => val.constructor.name !== type && val.__type !== type
  );
  return itemOfInvaldType === undefined;
};

// Simple checks
export const isSimpleType = (val: unknown): boolean =>
  isBoolean(val) || isString(val) || isNumber(val);

// IMTR helpers
export const addQuotes = (str: string): string => `"${str}"`;
export const removeQuotes = (obj: string): string => obj.replace(/['"]+/g, "");

// Make sure the value is of type object
export const isObject = (val: unknown): boolean =>
  typeof val === "object" && val !== null;
