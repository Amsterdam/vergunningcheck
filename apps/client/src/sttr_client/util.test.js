import {
  uniqueFilter,
  isSimpleType,
  collectionOfSimpleTypes,
  collectionOfType,
} from "./util";

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
});
