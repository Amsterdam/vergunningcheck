import { ZipCode, HouseNumberFull } from "./generic";

export const NO_MONUMENT = "NO_MONUMENT";
export const NATIONAL_MONUMENT = "NATIONAL_MONUMENT";
export const MUNICIPAL_MONUMENT = "MUNICIPAL_MONUMENT";
export const MUNICIPAL_MONUMENT_PROCEDURE = "MUNICIPAL_MONUMENT_PROCEDURE";
export const NO_CITY_SCAPE = "NO_CITY_SCAPE";
export const NATIONAL_CITY_SCAPE = "NATIONAL_CITY_SCAPE";
export const MUNICIPAL_CITY_SCAPE = "MUNICIPAL_CITY_SCAPE";
export const METRO_STATION = "METRO_STATION"; // Metro station

export type RestrictionProperty =
  | "NO_MONUMENT"
  | "NATIONAL_MONUMENT"
  | "MUNICIPAL_MONUMENT"
  | "MUNICIPAL_MONUMENT_PROCEDURE"
  | "NO_CITY_SCAPE"
  | "METRO_STATION"
  | "NATIONAL_CITY_SCAPE"
  | "MUNICIPAL_CITY_SCAPE";

export type RestrictionFixture = [
  ZipCode,
  HouseNumberFull,
  RestrictionProperty[]
];

export const getFixturesByProperties = (
  properties: RestrictionProperty[] | null
): RestrictionFixture[] | undefined =>
  properties === null
    ? fixtures.filter((fixture) => fixture[2].length === 0)
    : fixtures.filter((fixture) =>
        properties.every((property) => fixture[2].includes(property))
      );

export const fixtures = [
  // No special status for these addresses
  ["1054ZB", 44, [NO_MONUMENT, NO_CITY_SCAPE]],
  ["1058XH", "30 1", [NO_MONUMENT, NO_CITY_SCAPE]],
  ["1025VN", 809, [NO_MONUMENT, NO_CITY_SCAPE]],

  // Only national city scape addresses
  ["1072RD", 8, [NO_MONUMENT, NATIONAL_CITY_SCAPE]],
  ["1012TK", "2 C", [NO_MONUMENT, NATIONAL_CITY_SCAPE]],
  ["1072AX", "239 1", [NO_MONUMENT, NATIONAL_CITY_SCAPE]],

  // Only municipal city scape addresses
  ["1064 GV", "31", [NO_MONUMENT, MUNICIPAL_CITY_SCAPE]],

  // Only national monument
  ["1075AV", 18, [NATIONAL_MONUMENT, NO_CITY_SCAPE]],
  ["1095LJ", 633, [NATIONAL_MONUMENT, NO_CITY_SCAPE]],
  ["1054EX", 22, [NATIONAL_MONUMENT, NO_CITY_SCAPE]],

  // Only municipal monument
  ["1055XD", "19 c", [MUNICIPAL_MONUMENT, NO_CITY_SCAPE]],
  ["1073TK", 149, [MUNICIPAL_MONUMENT, NO_CITY_SCAPE]],
  ["1071GM", 124, [MUNICIPAL_MONUMENT, NO_CITY_SCAPE]],

  // Municipal monument and city scape
  ["1073HL", "2 1", [MUNICIPAL_MONUMENT, NATIONAL_CITY_SCAPE]],
  ["1078AW", 157, [MUNICIPAL_MONUMENT, NATIONAL_CITY_SCAPE]],
  ["1072RV", 21, [MUNICIPAL_MONUMENT, NATIONAL_CITY_SCAPE]],

  // National monument and city scape
  ["1012TK", "1 A", [NATIONAL_MONUMENT, NATIONAL_CITY_SCAPE]],
  ["1017GW", "279 H", [NATIONAL_MONUMENT, NATIONAL_CITY_SCAPE]],
  ["1073JP", 1, [NATIONAL_MONUMENT, NATIONAL_CITY_SCAPE]],

  // Address of metro station
  ["1018XA", 1, [METRO_STATION, NATIONAL_CITY_SCAPE]],

  // In procedure munical monument:
  ["1091XN", "17 2", [MUNICIPAL_MONUMENT_PROCEDURE]],
] as RestrictionFixture[];

// Get unique array from fixtures based on restrictions
export const uniqueFixtures = fixtures.reduce(
  (acc: RestrictionFixture[], curr: RestrictionFixture) => {
    if (
      !acc.filter(
        // Compare restrictions array
        (item) => JSON.stringify(item[2]) === JSON.stringify(curr[2])
      ).length
    ) {
      acc.push(curr);
    }
    return acc;
  },
  []
);
