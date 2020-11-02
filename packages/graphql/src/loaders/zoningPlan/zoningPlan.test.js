require("@spotify/polly-jest-presets");
const zoningPlan = require(".");
const { loaderFunctionsTest } = require("../../testUtils");

const key1 = "121642.505 487969.772";
const key2 = "121613 487990";

describe("ZoningPlan loader", () => {
  describe("Loader internals", loaderFunctionsTest(zoningPlan, key1, key2));
});
