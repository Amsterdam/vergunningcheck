require("@spotify/polly-jest-presets");
const { loaderFunctionsTest } = require("../../testUtils");

const building = require("./building");

const key1 = "0363100012061170";
const key2 = "0363100012061172";

describe("Building loader", () => {
  describe("Basic functions", loaderFunctionsTest(building, key1, key2));
});
