require("@spotify/polly-jest-presets");
const { loaderFunctionsTest } = require("../../testUtils");

const berth = require("./berth");

const key1 = "0363020000655767";
const key2 = "0363020000585970";

describe("Berth loader", () => {
  describe("Basic functions", loaderFunctionsTest(berth, key1, key2));
});
