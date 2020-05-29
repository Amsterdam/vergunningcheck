import isNumber from "lodash.isnumber";
import isBoolean from "lodash.isboolean";
import isString from "lodash.isstring";

// Simple checks
export const isSimpleType = (val) =>
  isBoolean(val) || isString(val) || isNumber(val);

// Array checks
export const collectionOfSimpleTypes = (col) =>
  Array.isArray(col) && !col.find((val) => !isSimpleType(val));

export const collectionOfType = (col, type) => {
  if (!Array.isArray(col) || col.includes(undefined) || col.includes(null)) {
    return false;
  }
  const itemOfInvaldType = col.find(
    (val) => val.constructor.name !== type && val.__type !== type
  );
  return itemOfInvaldType === undefined;
};

// Filters
export const uniqueFilter = (value, index, self) =>
  self.indexOf(value) === index;
