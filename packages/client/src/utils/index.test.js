import React, { useRef } from "react";

import {
  collectionOfSimpleTypes,
  collectionOfType,
  isSimpleType,
  isValidPostalcode,
  removeQuotes,
  scrollToRef,
  stripString,
  uniqueFilter,
} from "../utils";
import { render } from "./test-utils";

window.scrollTo = jest.fn();

let ref;

const Element = () => {
  ref = useRef(null);

  return <div data-testid="element" ref={ref} />;
};

describe("util", () => {
  test("uniqueFilter", () => {
    const arr = ["a", "b", "a", "c"];
    expect(arr.filter(uniqueFilter)).toStrictEqual(["a", "b", "c"]);
  });
  test("isSimpleType", () => {
    expect(isSimpleType(3)).toBe(true);
    expect(isSimpleType(-3)).toBe(true);
    expect(isSimpleType(true)).toBe(true);
    expect(isSimpleType(false)).toBe(true);
    expect(isSimpleType("x")).toBe(true);
    expect(isSimpleType({ a: 2 })).toBe(false);
    expect(isSimpleType(["a"])).toBe(false);
    expect(isSimpleType([true])).toBe(false);
    expect(isSimpleType([true, false])).toBe(false);
    expect(isSimpleType([3])).toBe(false);
  });
  test("collectionOfSimpleTypes", () => {
    expect(collectionOfSimpleTypes([1])).toBe(true);
    expect(collectionOfSimpleTypes([1, -1])).toBe(true);
    expect(collectionOfSimpleTypes([false])).toBe(true);
    expect(collectionOfSimpleTypes([false, false])).toBe(true);
    expect(collectionOfSimpleTypes(["no", false, -1])).toBe(true);

    expect(collectionOfSimpleTypes()).toBe(false);
    expect(collectionOfSimpleTypes(["a", {}])).toBe(false);
    expect(collectionOfSimpleTypes([true, [false]])).toBe(false);
  });
  test("collectionOfType", () => {
    expect(collectionOfType(["a"], "String")).toBe(true);
    expect(collectionOfType([3], "Number")).toBe(true);
    expect(collectionOfType([false], "Boolean")).toBe(true);

    expect(collectionOfType(["3"], "String")).toBe(true);
    expect(collectionOfType(["false"], "String")).toBe(true);

    expect(collectionOfType([undefined], "String")).toBe(false);
    expect(collectionOfType([null], "Number")).toBe(false);
    expect(collectionOfType([3], "String")).toBe(false);
    expect(collectionOfType(["false"], "Boolean")).toBe(false);
  });
  test("scrollToRef", () => {
    const { queryByTestId } = render(<Element />);
    const element = queryByTestId("element");
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
  test("removeQuotes", () => {
    expect(removeQuotes('"19-c"')).toBe("19-c");
    expect(removeQuotes('"Abc, 123. "')).toBe("Abc, 123. ");
    expect(removeQuotes('" A-b,c.d/e{f}[g]+-h& 1 "')).toBe(
      " A-b,c.d/e{f}[g]+-h& 1 "
    );
    expect(removeQuotes("text")).toBe("text");
    expect(removeQuotes('"text')).toBe("text");
    expect(removeQuotes(99)).toBe(99);
    expect(removeQuotes(true)).toBe(true);
  });
  test("isValidPostalcode", () => {
    // Should be false
    expect(isValidPostalcode()).toBe(false);
    expect(isValidPostalcode("")).toBe(false);
    expect(isValidPostalcode(1055)).toBe(false);
    expect(isValidPostalcode("19-c")).toBe(false);
    expect(isValidPostalcode("1055X")).toBe(false);
    expect(isValidPostalcode("1055XDD")).toBe(false);
    expect(isValidPostalcode("1055XD,")).toBe(false);
    // Should be true
    expect(isValidPostalcode("1055xd")).toBe(true);
    expect(isValidPostalcode("1055XD")).toBe(true);
    expect(isValidPostalcode("1055 Xd")).toBe(true);
    expect(isValidPostalcode(" 1055XD ")).toBe(true);
    expect(isValidPostalcode(" 1055 XD ")).toBe(true);
  });
});
