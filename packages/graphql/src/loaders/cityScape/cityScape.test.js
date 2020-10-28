const cityScape = require("rewire")(".");
const { reducer } = cityScape.__get__("loader");

describe("cityScape", () => {
  test("reducer", async () => {
    expect(reducer(require("./__mocks__/1477.json"))).toMatchSnapshot();
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
