import type { HouseNumberFull, ZipCode } from "./generic";

export const NO_ADDITIONS = "NO_ADDITIONS"; // address without additions, exact match
export const VALID_WITH_ADDITION = "VALID_WITH_ADDITION"; // number is valid in combination with addition
export const VALID_WITHOUT_ADDITION = "VALID_WITHOUT_ADDITION"; // number is valid without an addition
export const MANY_ADDITIONS = "MANY_ADDITIONS"; // many additions available
export const EXACT_MATCH = "EXACT_MATCH"; // Only one address for given housenumber + zipcode, ie 26 b and no 26

export const HAS_NOUN_ADDITION = "HAS_NOUN_ADDITION"; // One or more a, b, etc. (a char)
export const HAS_NUM_ADDITION = "HAS_NUM_ADDITION"; // One or more 1 1, 1 2, etc. (an int)
export const HAS_ALPHANUM_ADDITION = "HAS_ALPHANUM_ADDITION"; // One or more a 1, b 2, rood etc. (a string)
export const HAS_PLURAL_NOUN_ADDITION = "HAS_PLURAL_NOUN_ADDITION"; // One or more 20 H L, 20 H R

export type ZipCodeProperty =
  | "NO_ADDITIONS"
  | "VALID_WITH_ADDITION"
  | "VALID_WITHOUT_ADDITION"
  | "MANY_ADDITIONS"
  | "EXACT_MATCH"
  | "HAS_NOUN_ADDITION"
  | "HAS_NUM_ADDITION"
  | "HAS_ALPHANUM_ADDITION"
  | "HAS_PLURAL_NOUN_ADDITION";

export type ZipCodeFixture = [ZipCode, HouseNumberFull, ZipCodeProperty[]];

export const getFixturesByProperties = (
  properties: ZipCodeProperty[] | null
): ZipCodeFixture[] | undefined =>
  properties === null
    ? fixtures.filter((fixture) => fixture[2].length === 0)
    : fixtures.filter((fixture) =>
        properties.every((property) => fixture[2].includes(property))
      );

export const fixtures = [
  // Addresses without additions
  ["1031VA", 2, [NO_ADDITIONS, EXACT_MATCH, VALID_WITHOUT_ADDITION]],
  ["1031VX", 14, [NO_ADDITIONS, EXACT_MATCH, VALID_WITHOUT_ADDITION]],

  // Numeral additions, empty addition not allowed
  ["1072JG", 40, [VALID_WITH_ADDITION, HAS_NUM_ADDITION]],
  ["1072JV", 36, [VALID_WITH_ADDITION, HAS_NUM_ADDITION]],

  // Noun additions, empty addition not allowed
  ["1072RV", 21, [VALID_WITH_ADDITION, HAS_NOUN_ADDITION]],

  // A housenuber that's valid with AND without addition (eg. 1 and 1A, 1B, ...):
  ["1012TK", 1, [VALID_WITHOUT_ADDITION, VALID_WITH_ADDITION]],
  ["1043AP", 10, [VALID_WITHOUT_ADDITION, VALID_WITH_ADDITION]],
  ["1043AP", 34, [VALID_WITHOUT_ADDITION, VALID_WITH_ADDITION]],
  ["1027AE", 2, [VALID_WITHOUT_ADDITION, VALID_WITH_ADDITION]],
  ["1077BB", 48, [VALID_WITHOUT_ADDITION, VALID_WITH_ADDITION]],

  // Many additions for these house numbers
  ["1052VG", 14, [MANY_ADDITIONS, VALID_WITH_ADDITION, HAS_NOUN_ADDITION]], // (A - W)
  ["1043AN", 61, [MANY_ADDITIONS, VALID_WITH_ADDITION, HAS_NOUN_ADDITION]], // (A - Z)
  ["1077AW", 193, [MANY_ADDITIONS, VALID_WITH_ADDITION, HAS_NOUN_ADDITION]], // (A - N)

  // Numbers with noun AND numeral additions, only valid with addition
  ["1072JV", 40, [HAS_NUM_ADDITION, HAS_NOUN_ADDITION, VALID_WITH_ADDITION]],
  ["1077HK", 7, [HAS_NUM_ADDITION, HAS_NOUN_ADDITION, VALID_WITH_ADDITION]],
  ["1098RM", 26, [HAS_NUM_ADDITION, HAS_NOUN_ADDITION, VALID_WITH_ADDITION]],
  ["1073HL", 2, [HAS_NUM_ADDITION, HAS_NOUN_ADDITION, VALID_WITH_ADDITION]],
  ["1073JJ", 22, [HAS_NUM_ADDITION, HAS_NOUN_ADDITION, VALID_WITH_ADDITION]],
  ["1075AV", 8, [HAS_NUM_ADDITION, HAS_NOUN_ADDITION, VALID_WITH_ADDITION]],
  ["1077JH", 28, [HAS_NUM_ADDITION, HAS_NOUN_ADDITION, VALID_WITH_ADDITION]],

  // Complex additions and noun-additions, only with valid addition
  [
    "1077HP",
    81,
    [
      HAS_NUM_ADDITION,
      HAS_NOUN_ADDITION,
      HAS_ALPHANUM_ADDITION,
      VALID_WITH_ADDITION,
    ],
  ],
  [
    "1077HR",
    87,
    [
      HAS_NUM_ADDITION,
      HAS_NOUN_ADDITION,
      HAS_ALPHANUM_ADDITION,
      VALID_WITH_ADDITION,
    ],
  ],

  // Address valid without and with (complex) addition
  [
    "1077AK",
    79,
    [HAS_ALPHANUM_ADDITION, VALID_WITH_ADDITION, VALID_WITHOUT_ADDITION],
  ],

  // Addresses with more then one noun addition, empty addition also valid
  ["1027AE", 20, [HAS_PLURAL_NOUN_ADDITION, VALID_WITHOUT_ADDITION]],

  // Address with one exact match with noun addition
  ["1077JH", 26, [VALID_WITH_ADDITION, HAS_NOUN_ADDITION, EXACT_MATCH]],
  ["1073ER", 151, [VALID_WITH_ADDITION, HAS_NOUN_ADDITION, EXACT_MATCH]],
] as ZipCodeFixture[];
