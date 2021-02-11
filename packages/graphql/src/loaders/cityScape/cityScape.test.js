require("@spotify/polly-jest-presets");
const { loaderFunctionsTest, teardown } = require("../../testUtils");
const cityScape = require(".");
const mock = require("./__mocks__/1477.json");

const key1 = "f0ec3ea9-2ce4-4022-aba2-ab63ec448db9";
const key2 = "1477";

afterAll(teardown);

describe("CityScape loader", () => {
  describe("Basic functions", loaderFunctionsTest(cityScape, key1, key2));

  test("reducer", async () => {
    expect(cityScape.reducer(mock)).toMatchSnapshot();
  });

  test("findAddress key 1", async () => {
    const x = await cityScape.load([key1]);
    expect(await x[0]).toMatchSnapshot();
  });

  test("findAddress key 2", async () => {
    const x = await cityScape.load([key2]);
    expect(await x[0]).toMatchSnapshot();
  });

  test("findAddress non-existant", () =>
    expect(cityScape.fetch(["0"])).rejects.toThrow("Not Found"));
});
