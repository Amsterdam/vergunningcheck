import {
  getFixturesByProperties,
  NATIONAL_MONUMENT,
  MUNICIPAL_MONUMENT,
  NATIONAL_CITY_SCAPE,
  MUNICIPAL_CITY_SCAPE,
} from "./restriction";
import { random } from "./util";

const byProps = (props) => random(getFixturesByProperties(props))[2];

describe("restrictions", () => {
  test("non restricted", () => {
    expect(byProps(null)).toEqual([]);
  });

  describe("monuments", () => {
    test("has a national monument", () => {
      expect(byProps([NATIONAL_MONUMENT])).toEqual(
        expect.arrayContaining([NATIONAL_MONUMENT])
      );
    });
    test("has a minicipal monument", () => {
      expect(byProps([MUNICIPAL_MONUMENT])).toEqual(
        expect.arrayContaining([MUNICIPAL_MONUMENT])
      );
    });
  });

  describe("city scapes", () => {
    test("has a national city scape", () => {
      expect(byProps([NATIONAL_CITY_SCAPE])).toEqual(
        expect.arrayContaining([NATIONAL_CITY_SCAPE])
      );
    });
    test("has a municipal city scape", () => {
      expect(byProps([MUNICIPAL_CITY_SCAPE])).toEqual(
        expect.arrayContaining([MUNICIPAL_CITY_SCAPE])
      );
    });
  });

  describe("combined", () => {
    test("has a municipal monument and national city scape", () => {
      const properties = byProps([MUNICIPAL_MONUMENT, NATIONAL_CITY_SCAPE]);
      expect(properties).toEqual(
        expect.arrayContaining([MUNICIPAL_MONUMENT, NATIONAL_CITY_SCAPE])
      );
      expect(properties).not.toEqual(
        expect.arrayContaining([NATIONAL_MONUMENT, MUNICIPAL_CITY_SCAPE])
      );
    });
    test("has a national monument and national city scape", () => {
      const properties = byProps([NATIONAL_MONUMENT, NATIONAL_CITY_SCAPE]);
      expect(properties).toEqual(
        expect.arrayContaining([NATIONAL_MONUMENT, NATIONAL_CITY_SCAPE])
      );
      expect(properties).not.toEqual(
        expect.arrayContaining([MUNICIPAL_MONUMENT, MUNICIPAL_CITY_SCAPE])
      );
    });
  });
});
