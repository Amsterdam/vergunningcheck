import isBoolean from "lodash.isboolean";
import isNumber from "lodash.isnumber";
import isString from "lodash.isstring";

import { topics } from "../config";

// Find a topic by the slug
export const findTopicBySlug = (slug) => topics.find((t) => t.slug === slug);

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

// Data utils
export const getRestrictionByTypeName = (restrictions, typeName) =>
  (restrictions || []).find(({ __typename }) => __typename === typeName);

// IMTR helper
export const removeQuotes = (str) =>
  typeof str === "string" ? str.replace(/['"]+/g, "") : "";

export const addQuotes = (str) => `"${str}"`;

// `uniqBy` removes duplicates from an array (of objects) and is based on lodash.uniqBy
// see: https://stackoverflow.com/a/40808569
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

/**
 *
 * Scroll to `ref` in page. This function calculates the distance between
 * the top of the window and the top of the element and scrolls to it.
 *
 * @param {object} ref - reference to an element created by React.useRef()
 * @param {number} offset - pass an offset to reduce from the total distance
 */
export const scrollToRef = (ref, offset = 0) =>
  ref &&
  window.scrollTo(
    0,
    ref.current.getBoundingClientRect().top + window.scrollY - offset
  );
