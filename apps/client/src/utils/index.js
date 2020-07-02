import isBoolean from "lodash.isboolean";
import isNumber from "lodash.isnumber";
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

export const isObject = (val) => typeof val === "object" && val !== null;

// Filters
export const uniqueFilter = (value, index, self) =>
  self.indexOf(value) === index;

// We use the uniqBy to filter and reduce to array by it's predicate.
// And we return it as a array of unique objects.
export const uniqBy = (arr, predicate) => {
  if (!Array.isArray(arr)) {
    return [];
  }

  const cb = typeof predicate === "function" ? predicate : (o) => o[predicate];

  const pickedObjects = arr
    .filter((item) => item)
    .reduce((map, item) => {
      const key = cb(item);

      if (!key) {
        return map;
      }

      return map.has(key) ? map : map.set(key, item);
    }, new Map())
    .values();

  return [...pickedObjects];
};
