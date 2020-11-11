import React, { useRef } from "react";

import {
  isValidPostalcode,
  removeQueryStrings,
  scrollToRef,
  stripString,
} from "../utils";
import { render } from "./test-utils";

window.scrollTo = jest.fn();

let ref;

const Element = () => {
  ref = useRef(null);

  return <div data-testid="element" ref={ref} />;
};

describe("util", () => {
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
  test("isValidPostalcode", () => {
    // Should be false
    expect(isValidPostalcode()).toBe(false);
    expect(isValidPostalcode("")).toBe(false);
    expect(isValidPostalcode(1055)).toBe(false);
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
});
