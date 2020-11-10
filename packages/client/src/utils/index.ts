import { matchPath } from "react-router";

import { Topic, topics } from "../config";
import { imtrSlugs, oloRedirectSlugs, oloSlugs } from "../routes";
import topicsJson from "../topics.json";

// Get slug from url
export const getSlugFromPathname = (pathname: string) => {
  const match = matchPath(pathname, {
    path: `/:slug(${imtrSlugs}|${oloSlugs}|${oloRedirectSlugs})`,
  }) as any;

  return match?.params?.slug;
};

// Find a topic by the slug
export const findTopicBySlug = (slug: string) => {
  const topic = topics.find((t) => t.slug === slug);
  if (topic) return topic;

  const topicConfig = topicsJson.flat().find((topic) => topic.slug === slug);
  if (!topicConfig) {
    return null;
  }

  const name = topicConfig.name || topicConfig.slug;

  return {
    hasIMTR: true,
    name,
    slug,
    text: {
      heading: name,
    },
  } as Topic;
};

// Data utils
export const getRestrictionByTypeName = (
  restrictions?: [
    {
      __typename: string;
      name: string;
      scope: string;
    }
  ],
  typeName?: string
) => (restrictions || []).find(({ __typename }) => __typename === typeName);

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
 * @param {object} ref - reference to an element created by React.useRef()
 * @param {number} offset - pass an offset to reduce from the total distance
 */
export const scrollToRef = (
  ref: React.MutableRefObject<HTMLAnchorElement>,
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
 * This function removes all query strings from an URL
 *
 * @param {string} value
 */
export const removeQueryStrings = (value: string) => {
  return value.split("?")[0];
};
