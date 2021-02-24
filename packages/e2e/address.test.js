describe("mocking support", () => {
  /**
   * Following test is disabled because we cannot import from @vergunningcheck/mocking as it
   * typescript and this packages does not have typescript setup.
   * @TODO We need to decide if we want to add typescript to all consumers of @vergunningcheck/mocking
   * or if we can make it importable from non-typescript packages.
   */
  xit("Should be able to import an address from our mocking package", () => {
    const address = require("./address");
    assert(address).toEqual({
      houseNumber: 19,
      houseNumberAddition: "C",
      houseNumberFull: "19c",
      streetName: "Louise de Colignystraat",
      zipCode: "1055XD",
    });
  });
});
