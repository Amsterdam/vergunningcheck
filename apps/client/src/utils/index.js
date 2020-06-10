import isNumber from "lodash.isnumber";
import isBoolean from "lodash.isboolean";
import isString from "lodash.isstring";

// Simple checks
export const isSimpleType = (val) =>
  isBoolean(val) || isString(val) || isNumber(val);

export const isEmptyObject = (obj) =>
  // Check the constructor too because Object.keys(new Date()).length === 0;
  Object.keys(obj).length === 0 && obj.constructor === Object;

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

// Data utils
export const getRestrictionByTypeName = (restrictions, typeName) =>
  (restrictions || []).find(({ __typename }) => __typename === typeName);
