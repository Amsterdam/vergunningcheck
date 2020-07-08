const NATIONAL_MONUMENT = "NATIONAL_MONUMENT";
const MUNICIPAL_MONUMENT = "MUNICIPAL_MONUMENT";
const CITY_SCAPE = "CITY_SCAPE";

const fixtures = [
  // No special status for these addresses
  ["1054ZB", 44, []],
  ["1058XH", "30 1", []],
  ["1025VN", 809, []],

  // Only city scape addresses
  ["1072RD", 8, [CITY_SCAPE]],
  ["1012TK", "2 C", [CITY_SCAPE]],
  ["1072AX", "239 1", [CITY_SCAPE]],

  // Only national heritage
  ["1075AV", 18, [NATIONAL_MONUMENT]],
  ["1095LJ", 633, [NATIONAL_MONUMENT]],
  ["1054EX", 22, [NATIONAL_MONUMENT]],

  // Only municipal heritage
  ["1055XD", "19 c", [MUNICIPAL_MONUMENT]],
  ["1073TK", 149, [MUNICIPAL_MONUMENT]],
  ["1071GM", 124, [MUNICIPAL_MONUMENT]],

  // Municipal heritage and city scape
  ["1073HL", "2 1", [MUNICIPAL_MONUMENT, CITY_SCAPE]],
  ["1078AW", 157, [MUNICIPAL_MONUMENT, CITY_SCAPE]],
  ["1072RV", 21, [MUNICIPAL_MONUMENT, CITY_SCAPE]],

  // National heritage and city scape
  ["1012TK", "1 A", [NATIONAL_MONUMENT, CITY_SCAPE]],
  ["1017GW", "279 H", [NATIONAL_MONUMENT, CITY_SCAPE]],
  ["1073JP", 1, [NATIONAL_MONUMENT, CITY_SCAPE]],
];

module.exports = fixtures;
