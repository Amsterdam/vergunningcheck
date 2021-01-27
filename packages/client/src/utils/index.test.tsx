import React, { useRef } from "react";

import addressMock from "../__mocks__/addressMock";
import { topics } from "../config";
import nl from "../i18n/nl";
import topicsJson from "../topics.json";
import {
  findTopicBySlug,
  getAnswerLabel,
  getRestrictionByTypeName,
  isEmptyObject,
  isValidPostalcode,
  removeQueryStrings,
  sanitizeHouseNumberFull,
  scrollToRef,
  stripString,
} from "./index";
import { render } from "./test-utils";

window.scrollTo = jest.fn();

let ref: any;

const Element = () => {
  ref = useRef(null);

  return <div data-testid="element" ref={ref} />;
};

describe("util", () => {
  test("scrollToRef", () => {
    const { queryByTestId } = render(<Element />);
    const element = queryByTestId("element") as any;
    element.getBoundingClientRect = jest.fn(() => ({
      top: 100,
    }));

    expect(element).toBeInTheDocument();

    scrollToRef(ref);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 100);

    scrollToRef(ref, 10);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 90);

    expect(window.scrollTo).toHaveBeenCalledTimes(2);
  });
  test("stripString", () => {
    expect(stripString("19-c")).toBe("19c");
    expect(stripString("19 C")).toBe("19c");
    expect(stripString("19-C ")).toBe("19c");
    expect(stripString("Abc, 123. ")).toBe("abc123");
    expect(stripString(" A-b,c.d/e{f}[g]+-h& 1 ")).toBe("abcdefgh1");
  });
  test("isValidPostalcode", () => {
    // Should be false
    expect(isValidPostalcode()).toBe(false);
    expect(isValidPostalcode("")).toBe(false);
    expect(isValidPostalcode(1055 as any)).toBe(false);
    expect(isValidPostalcode("19-c")).toBe(false);
    expect(isValidPostalcode("1055X")).toBe(false);
    expect(isValidPostalcode("1055XDD")).toBe(false);
    expect(isValidPostalcode("1055XD,")).toBe(false);
    expect(isValidPostalcode("0155XD,")).toBe(false);
    // Should be true
    expect(isValidPostalcode("1055xd")).toBe(true);
    expect(isValidPostalcode("1055XD")).toBe(true);
    expect(isValidPostalcode("1055 Xd")).toBe(true);
    expect(isValidPostalcode(" 1055XD ")).toBe(true);
    expect(isValidPostalcode(" 1055 XD ")).toBe(true);
  });
  test("sanitizeHouseNumberFull", () => {
    expect(sanitizeHouseNumberFull(undefined)).toBe("");
    expect(sanitizeHouseNumberFull("")).toBe("");
    expect(sanitizeHouseNumberFull("110")).toBe("110");
    expect(sanitizeHouseNumberFull("1 10")).toBe("1 10");
    expect(sanitizeHouseNumberFull("19-c")).toBe("19 - C");
    expect(sanitizeHouseNumberFull("19-c   ")).toBe("19 - C");
    expect(sanitizeHouseNumberFull("   19-c   ")).toBe("19 - C");
    expect(sanitizeHouseNumberFull("10hl")).toBe("10 H L");
    expect(sanitizeHouseNumberFull("10h l")).toBe("10 H L");
    expect(sanitizeHouseNumberFull("&")).toBe("&");
    expect(sanitizeHouseNumberFull("101&")).toBe("101&");
    expect(sanitizeHouseNumberFull("101 &")).toBe("101 &");
    expect(sanitizeHouseNumberFull("101 &a")).toBe("101 & A");
    expect(sanitizeHouseNumberFull("101 &1")).toBe("101 &1");
  });
  test("removeQueryStrings", () => {
    expect(removeQueryStrings("")).toBe("");
    expect(removeQueryStrings("https://amsterdam.nl")).toBe(
      "https://amsterdam.nl"
    );
    expect(removeQueryStrings("https://amsterdam.nl/path")).toBe(
      "https://amsterdam.nl/path"
    );
    expect(removeQueryStrings("https://amsterdam.nl/path?hslfhjksf")).toBe(
      "https://amsterdam.nl/path"
    );
    expect(removeQueryStrings("https://amsterdam.nl/path?q=1&q=2")).toBe(
      "https://amsterdam.nl/path"
    );
    expect(removeQueryStrings("https://amsterdam.nl/path?q=1&q=2#target")).toBe(
      "https://amsterdam.nl/path"
    );
    expect(removeQueryStrings("https://amsterdam.nl/path#target")).toBe(
      "https://amsterdam.nl/path#target"
    );
  });

  test("isEmptyObject", () => {
    expect(isEmptyObject({} as any)).toBe(true);
    expect(isEmptyObject(true as any)).toBe(false);
    expect(isEmptyObject(-1 as any)).toBe(false);
    expect(isEmptyObject(1 as any)).toBe(false);
    expect(isEmptyObject(NaN as any)).toBe(false);
    expect(isEmptyObject(/x/ as any)).toBe(false);
    expect(isEmptyObject(Symbol as any)).toBe(false);
    expect(isEmptyObject(null as any)).toBe(false);
    expect(isEmptyObject(undefined as any)).toBe(false);
    expect(isEmptyObject([0])).toBe(false);
    expect(isEmptyObject({ a: 0 })).toBe(false);
    expect(isEmptyObject("a" as any)).toBe(false);
    expect(isEmptyObject({ length: 0 })).toBe(false);
    expect(isEmptyObject(new Set() as any)).toBe(false);
    expect(isEmptyObject(new Date() as any)).toBe(false);
    expect(isEmptyObject((<></>) as any)).toBe(false);
  });

  test("getAnswerLabel", () => {
    const { no, yes } = nl.translation.common;
    expect(getAnswerLabel('"Yes"')).toBe("Yes");
    expect(getAnswerLabel("Yes")).toBe("Yes");
    expect(getAnswerLabel("yes")).toBe("yes");
    expect(getAnswerLabel(true)).toBe(yes);
    expect(getAnswerLabel(false)).toBe(no);
    expect(getAnswerLabel(0)).toBe(0);
  });

  test("findTopicBySlug", () => {
    expect(findTopicBySlug("")).toBe(null);
    expect(findTopicBySlug("wrong")).toBe(null);
    expect(findTopicBySlug(topics[0].slug)).toBe(topics[0]);

    // 'Find' an "unconfigured" topic
    const topicMock = topicsJson
      .flat()
      .find((t) => t.permits.length === 1) as any;
    const { slug } = topicMock;
    expect(slug).toBeTruthy();
    expect(findTopicBySlug(slug)?.slug).toBe(slug);
  });

  test("getRestrictionByTypeName", () => {
    expect(getRestrictionByTypeName()).toBe(undefined);

    expect(
      getRestrictionByTypeName(addressMock.restrictions, "Monument")
    ).toStrictEqual({ __typename: "Monument", name: "Gemeentelijk monument" });

    expect(
      getRestrictionByTypeName(addressMock.restrictions, "CityScape")
    ).toStrictEqual({
      __typename: "CityScape",
      name: "cityscape",
      scope: "NATIONAL",
    });

    // Should be case insensitive
    expect(
      getRestrictionByTypeName(addressMock.restrictions, "monument")
    ).toStrictEqual({ __typename: "Monument", name: "Gemeentelijk monument" });
  });
});
