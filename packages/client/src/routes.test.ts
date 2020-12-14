import slugify from "slugify";

import { getslug, geturl } from "./routes";

const text =
  "U gaat het dakraam plaatsen aan de achterkant van het gebouw. Ligt die kant aan een straat, fietspad of voetpad waar iedereen mag komen?";
const slug =
  "u-gaat-het-dakraam-plaatsen-aan-de-achterkant-van-het-gebouw-ligt-die-kant-aan-een-straat-fietspad-of-voetpad-waar-iedereen-mag-komen";

describe("Routes", () => {
  test("getslug returns correct slug", () => {
    expect(getslug(text)).toBe(slug);
  });

  test("slugify dependency works as expected", () => {
    expect(
      slugify(text, {
        strict: true, // remove special chars
        lower: true, // result in lower case
      })
    ).toBe(slug);
  });

  test("geturl doesn't throw errors", () => {
    expect(
      // @ts-expect-error
      () => geturl()
    ).toThrowError();
    expect(() => geturl("/")).not.toThrowError();
  });
});
