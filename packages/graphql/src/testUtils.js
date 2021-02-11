const debug = require("debug")("graphql:testUtil");
const { client } = require("./cache");

const loaderFunctionsTest = (module, key1, key2) => {
  /* eslint-disable no-param-reassign */
  module.load = jest.fn(module.load);
  module.cached = jest.fn(module.cached);
  module.fetch = jest.fn(module.fetch);
  module.reducer = jest.fn(module.reducer);

  return () => {
    beforeEach(async () => {
      client.flushdb();
      await jest.clearAllMocks();
    });

    test("module result", async () => {
      const a = await Promise.all(await module.load([key1]));
      const b = await Promise.all(await module.load([key2]));

      expect(a).toMatchSnapshot();
      expect(b).toMatchSnapshot();
    });

    test("cache hit", async () => {
      debug("start testing cache hit");
      const a = await Promise.all(await module.load([key1]));
      const b = await Promise.all(await module.load([key1]));

      debug("start expecting for cache hit");

      expect(a).toStrictEqual(b);
      expect(module.load).toHaveBeenCalledTimes(2);
      expect(module.cached).toHaveBeenCalledTimes(2);
      expect(module.fetch).toHaveBeenCalledTimes(1);
      expect(module.reducer).toHaveBeenCalledTimes(1);
    });

    test("cache miss", async () => {
      debug("start testing cache miss");
      const a = await Promise.all(await module.load([key1]));
      const b = await Promise.all(await module.load([key2]));

      debug("start expecting for cache miss");
      expect(a).not.toStrictEqual(b);
      expect(module.load).toHaveBeenCalledTimes(2);
      expect(module.cached).toHaveBeenCalledTimes(2);
      expect(module.fetch).toHaveBeenCalledTimes(2);
      expect(module.reducer).toHaveBeenCalledTimes(2);
    });
  };
};

module.exports = {
  loaderFunctionsTest,
  teardown: () => client.quit(),
};
