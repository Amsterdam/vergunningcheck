require("@spotify/polly-jest-presets");
const { loaderFunctionsTest } = require("../../testUtils");
const cityScape = require(".");
const mock = require("./__mocks__/1477.json");

const key1 = "f0ec3ea9-2ce4-4022-aba2-ab63ec448db9";
const key2 = "1477";

describe("CityScape loader", () => {
  describe("Basic functions", loaderFunctionsTest(cityScape, key1, key2));

  test("reducer", async () => {
    expect(cityScape.reducer(mock)).toMatchSnapshot();
  });

  test("findAddress", async () => {
    const x = await cityScape.load(["1477"]);
    expect(await x[0]).toMatchSnapshot();
  });

  test("findAddress", async () => {
    const x = await cityScape.load(["f0ec3ea9-2ce4-4022-aba2-ab63ec448db9"]);
    expect(await x[0]).toMatchSnapshot();
  });

  test("findAddress", async () => {
    const x = await cityScape.load(["0"]);
    expect(await x[0]).toMatchSnapshot();
  });
});
