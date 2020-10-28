const bagSearch = require("rewire")(".");
const { reducer } = bagSearch.__get__("loader");

describe("bagsearch", () => {
  test("reducer", async () => {
    expect(reducer(require("./__mocks__/basisweg30.json"))).toMatchSnapshot();
  });

  test("findAddress", async () => {
    const x = await bagSearch.load(["basisweg 30"]);
    expect(await x[0]).toMatchSnapshot();
  });
});
