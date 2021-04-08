import Rule from "./rule";

describe("Rule", () => {
  test("constructor", () => {
    expect(
      () => new Rule({ inputConditions: undefined as any, outputValue: "yes" })
    ).toThrow(
      "'inputConditions' on Rule should be an array with at least one real value."
    );
    expect(() => new Rule({ inputConditions: [], outputValue: "yes" })).toThrow(
      "'inputConditions' on Rule should be an array with at least one real value."
    );
    expect(
      () => new Rule({ inputConditions: [true], outputValue: undefined as any })
    ).toThrow("'outputValue' should be a number, boolean or string");
  });

  test("evaluateNew", () => {
    expect(
      new Rule({
        inputConditions: [true, "-", false],
        outputValue: "yes",
      }).evaluateNew([true, false, false])
    ).toEqual([0, 2]);

    // non-match values
    expect(
      new Rule({
        inputConditions: [true, false],
        outputValue: "yes",
      }).evaluateNew([true])
    ).toStrictEqual([]);
    expect(
      new Rule({
        inputConditions: [false, true],
        outputValue: "yes",
      }).evaluateNew([true])
    ).toStrictEqual([]);
    expect(
      new Rule({
        inputConditions: [true, false],
        outputValue: "yes",
      }).evaluateNew([false])
    ).toStrictEqual([]);
    expect(
      new Rule({
        inputConditions: [false, true],
        outputValue: "yes",
      }).evaluateNew([false])
    ).toStrictEqual([]);
    expect(
      new Rule({ inputConditions: [true], outputValue: "yes" }).evaluateNew([
        false,
      ])
    ).toStrictEqual([]);
    expect(
      new Rule({ inputConditions: [false], outputValue: "yes" }).evaluateNew([
        true,
      ])
    ).toStrictEqual([]);

    // matches
    expect(
      new Rule({ inputConditions: [true], outputValue: "yes" }).evaluateNew([
        true,
      ])
    ).toStrictEqual([0]);
    expect(
      new Rule({ inputConditions: [false], outputValue: "yes" }).evaluateNew([
        false,
      ])
    ).toStrictEqual([0]);
    expect(
      new Rule({
        inputConditions: [true, false],
        outputValue: "yes",
      }).evaluateNew([true, false])
    ).toStrictEqual([0, 1]);
    expect(
      new Rule({
        inputConditions: [false, true],
        outputValue: "yes",
      }).evaluateNew([false, true])
    ).toStrictEqual([0, 1]);

    // partial non-matches
    expect(
      new Rule({
        inputConditions: [true, false],
        outputValue: "yes",
      }).evaluateNew([true])
    ).toStrictEqual([]);
    expect(
      new Rule({
        inputConditions: [false, true],
        outputValue: "yes",
      }).evaluateNew([false])
    ).toStrictEqual([]);
    expect(
      new Rule({ inputConditions: [true], outputValue: "yes" }).evaluateNew([])
    ).toStrictEqual([]);
    expect(
      new Rule({ inputConditions: [false], outputValue: "yes" }).evaluateNew([])
    ).toStrictEqual([]);

    // partial match values
    expect(
      new Rule({ inputConditions: [true], outputValue: "yes" }).evaluateNew([
        true,
        false,
      ])
    ).toStrictEqual([0]);
    expect(
      new Rule({ inputConditions: [false], outputValue: "yes" }).evaluateNew([
        false,
        true,
      ])
    ).toStrictEqual([0]);
    expect(
      new Rule({
        inputConditions: [true, false],
        outputValue: "yes",
      }).evaluateNew([true, false, "x"])
    ).toStrictEqual([0, 1]);
    expect(
      new Rule({
        inputConditions: [true, "x"],
        outputValue: "yes",
      }).evaluateNew([true, "x", "y"])
    ).toStrictEqual([0, 1]);

    // check types
    expect(
      new Rule({ inputConditions: ["x"], outputValue: "yes" }).evaluateNew([
        false,
        true,
      ])
    ).toStrictEqual([]);
    expect(
      new Rule({
        inputConditions: [true, false],
        outputValue: "yes",
      }).evaluateNew([true, "false"])
    ).toStrictEqual([]);
    expect(
      new Rule({ inputConditions: [true], outputValue: "yes" }).evaluateNew([
        "true",
      ])
    ).toStrictEqual([]);

    // error cases
    expect(() =>
      new Rule({ inputConditions: [true], outputValue: "yes" }).evaluateNew(
        undefined as any
      )
    ).toThrow("'values' should be an array");
    expect(() =>
      new Rule({ inputConditions: [true], outputValue: "yes" }).evaluateNew(
        {} as any
      )
    ).toThrow("'values' should be an array");
    expect(() =>
      new Rule({ inputConditions: [true], outputValue: "yes" }).evaluateNew(
        null as any
      )
    ).toThrow("'values' should be an array");
    expect(() =>
      new Rule({ inputConditions: [true], outputValue: "yes" }).evaluateNew(
        false as any
      )
    ).toThrow("'values' should be an array");
  });

  test("description", () => {
    expect(
      new Rule({
        inputConditions: [true],
        outputValue: true,
        description: "My very clear description.",
      }).description
    ).toBe("My very clear description.");
  });
  test("outputValue", () => {
    expect(
      new Rule({ inputConditions: [true], outputValue: true }).outputValue
    ).toBe(true);
    expect(
      new Rule({ inputConditions: [true], outputValue: false }).outputValue
    ).toBe(false);
    expect(
      new Rule({ inputConditions: [true], outputValue: "yes" }).outputValue
    ).toBe("yes");
  });
});
