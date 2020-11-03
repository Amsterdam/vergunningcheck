require("@spotify/polly-jest-presets");
const { loaderFunctionsTest } = require("../../testUtils");
const mock = require("./__mocks__/basisweg30.json");

const bagSearch = require(".");

const key1 = "basisweg 30";
const key2 = "1055xd 19c";

describe("BagSearch loader", () => {
  describe("Basic functions", loaderFunctionsTest(bagSearch, key1, key2));

  test("reducer", async () => {
    expect(bagSearch.reducer(mock)).toMatchSnapshot();
  });

  test("findAddress", async () => {
    const x = await bagSearch.load(["basisweg 30"]);
    expect(await x[0]).toMatchSnapshot();
  });
});
