require("@spotify/polly-jest-presets");
const { loaderFunctionsTest } = require("../../testUtils");

const monument = require("./monument");

const key1 = "086282f7-8087-4a00-8d82-ddf294059253";
const key2 = "aef46aca-843e-44a5-b772-6a6d6490bb21";

describe("Monument loader", () => {
  describe("Basic functions", loaderFunctionsTest(monument, key1, key2));
});
