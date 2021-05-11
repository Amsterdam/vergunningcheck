const address = require("./address");

describe("mocking support", () => {
  it("Should be able to import an address from our mocking package", () => {
    expect(address).toEqual({
      houseNumber: 19,
      houseNumberAddition: "C",
      houseNumberFull: "19c",
      streetName: "Louise de Colignystraat",
      zipCode: "1055XD",
    });
  });
});
