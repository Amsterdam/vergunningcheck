const NATIONAL_HERITAGE = "NATIONAL_HERITAGE";
const MUNICIPAL_HERITAGE = "MUNICIPAL_HERITAGE";
const CITY_SCAPE = "CITY_SCAPE";

const fixtures = [
  // No special status for these addresses
  ["1054ZB", 44, []],
  ["1058XH", "30 1", []],
  ["1025VN", 809, []],

  // City scape addresses
  ["1072RD", 8, [CITY_SCAPE]],
  ["1012TK", "2 C", [CITY_SCAPE]],
  ["1072AX", "239 1", [CITY_SCAPE]],

  // National heritage
  ["1075AV", 18, [NATIONAL_HERITAGE]],
  ["1095LJ", 633, [NATIONAL_HERITAGE]],
  ["1054EX", 22, [NATIONAL_HERITAGE]],

  // Municipal heritage
  ["1055XD", "19 c", [MUNICIPAL_HERITAGE]],
  ["1073TK", 149, [MUNICIPAL_HERITAGE]],
  ["1071GM", 124, [MUNICIPAL_HERITAGE]],

  // Municipal heritage and city scape
  ["1073HL", "2 1", [MUNICIPAL_HERITAGE, CITY_SCAPE]],
  ["1078AW", 157, [MUNICIPAL_HERITAGE, CITY_SCAPE]],
  ["1072RV", 21, [MUNICIPAL_HERITAGE, CITY_SCAPE]],

  // National heritage and city scape
  ["1012TK", "1 A", [NATIONAL_HERITAGE, CITY_SCAPE]],
  ["1017GW", "279 H", [NATIONAL_HERITAGE, CITY_SCAPE]],
  ["1073JP", 1, [NATIONAL_HERITAGE, CITY_SCAPE]],
];

module.exports = fixtures;
