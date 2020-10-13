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
  typeof str === "string" ? str.replace(/['"]+/g, "") : str;

export const addQuotes = (str) => `"${str}"`;

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

/**
 *
 * This function strips everything from a string that's not a letter or number, including spaces.
 * Usefull when comparing strings like `19-c` and `19 C `, which will both be `19c`
 *
 * @param {string | undefined} str
 */
export const stripString = (str) =>
  str && str.toLowerCase().replace(/[^a-z0-9]+/gi, "");

/**
 *
 * This function return `true` or `false` wheter or not a value is a equal to a Dutch postalcode (eg: 1055XD)
 *
 * @param {string} value
 */
export const isValidPostalcode = (value) => {
  const postalCodeRegex = /^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i;
  return !!(value && value.toString().trim().match(postalCodeRegex));
};

//  36,40
