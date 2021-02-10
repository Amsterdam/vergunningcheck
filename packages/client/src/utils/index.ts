import { ClientSimpleType, removeQuotes } from "@vergunningcheck/imtr-client";
import { MutableRefObject } from "react";
import { matchPath } from "react-router";

import { Topic, topics } from "../config";
import nl from "../i18n/nl";
import { imtrSlugs, oloRedirectSlugs, oloSlugs } from "../routes";
import apiTopics from "../topics.json";
import { Answer, Restriction, TopicType } from "../types";

const { no, yes } = nl.translation.common;

// Get slug from url
export const getSlugFromPathname = (pathname: string) => {
  const match = matchPath(pathname, {
    path: `/:slug(${imtrSlugs}|${oloSlugs}|${oloRedirectSlugs})`,
  }) as any;

  return match?.params?.slug;
};

// Find a topic by the slug
export const findTopicBySlug = (slug: string): Topic | undefined => {
  const topic = topics.find((t) => t.slug === slug);
  if (topic) return topic;

  const topicConfig = apiTopics.flat().find((topic) => topic.slug === slug);
  if (!topicConfig) {
    return undefined;
  }

  // Provide name (with slug as fallback)
  // This test coverage can be achieved by mocking `topics.json` (see: /client/src/utils/index.test.tsx)
  const { name = slug } = topicConfig;

  return new Topic({
    name,
    slug,
    text: {
      heading: name,
    },
    type: TopicType.PERMIT_CHECK,
  });
};

// Data utils
export const getRestrictionByTypeName = (
  restrictions?: Restriction[],
  typeName?: string
) =>
  (restrictions || []).find(
    ({ __typename }) => __typename?.toLowerCase() === typeName?.toLowerCase()
  );

/**
 * Test if obj is `{}`
 *
 * Taken from https://stackoverflow.com/a/32108184
 *
 * Because `Object.keys(new Date()).length === 0` we have to do an additional check.
 */
export const isEmptyObject = (obj: object) =>
  obj !== undefined &&
  obj !== null &&
  Object.keys(obj).length === 0 &&
  obj.constructor === Object;

/**
 *
 * Scroll to `ref` in page. This function calculates the distance between
 * the top of the window and the top of the element and scrolls to it.
 *
 * @param {object} ref - reference to an element created by useRef()
 * @param {number} offset - pass an offset to reduce from the total distance
 */
export const scrollToRef = (
  ref: MutableRefObject<HTMLAnchorElement>,
  offset: number = 0
) =>
  ref &&
  window.scrollTo(
    0,
    ref?.current?.getBoundingClientRect().top + window.scrollY - offset
  );

/**
 *
 * This function strips everything from a string that's not a letter or number, including spaces.
 * Usefull when comparing strings like `19-c` and `19 C `, which will both be `19c`
 *
 * @param {string | undefined} str
 */
export const stripString = (str?: string) =>
  str && str.toLowerCase().replace(/[^a-z0-9]+/g, "");

/**
 *
 * This function return `true` or `false` wheter or not a value is a equal to a Dutch postalcode (eg: 1055XD)
 *
 * @param {string} value
 */
export const isValidPostalcode = (value?: string) => {
  const postalCodeRegex = /^[1-9][0-9]{3}[\s]?[a-z]{2}$/i;
  return !!(value && value.toString().trim().match(postalCodeRegex));
};

/**
 *
 * This function transforms some cases where a user for example makes a typo or makes a strange space combination to a valid option.
 * For example:
 *  10h l -> 10 H L
 *  10hl -> 10 H L
 * @param {string} value
 */
export const sanitizeHouseNumberFull = (value?: string) => {
  const spacesBeforeAndAfterNonDigit = /\d+|\D+/g;
  const nonDigits = /[a-z]/i;
  const tokenizeLetterAndNonLetter = /[^A-Z\s]+|[A-Z]/g;

  if (!value) return "";
  if (!nonDigits.test(value)) return value;
  return (
    (value.toUpperCase().match(tokenizeLetterAndNonLetter) || []) // tokenize the string into letter/non-letter & non-whitespace chunks
      .join(" ") // Revert to one string
      .match(spacesBeforeAndAfterNonDigit) || []
  ) // Add spaces before/after a non-digit
    .join(" ") // Revert to one string
    .replace(/\s+/g, " ")
    .trim();
};

/**
 *
 * This function removes all query strings from an URL
 *
 * @param {string} value
 */
export const removeQueryStrings = (value: string) => {
  return value.split("?")[0];
};

/**
 *
 * These are the hardcoded values and label for boolean questions
 *
 */
export const booleanOptions: Answer[] = [
  {
    formValue: "yes",
    label: yes,
    value: true,
  },
  {
    formValue: "no",
    label: no,
    value: false,
  },
];

/**
 *
 * This function can be used to get the labels of boolean questions
 *
 * @param {ClientSimpleType} answer
 */
export const getAnswerLabel = (answer: ClientSimpleType) => {
  if (typeof answer === "boolean") {
    return answer ? yes : no;
  } else if (typeof answer === "string") {
    return removeQuotes(answer);
  }
  return answer;
};
