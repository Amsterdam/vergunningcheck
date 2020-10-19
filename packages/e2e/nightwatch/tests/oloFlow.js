const {
  domain,
  selectors,
  olo: { selectors: oloSelectors },
} = require("../config");

const address = {
  zipCode: "1055XD",
  streetName: "Louise de Colignystraat",
  houseNumber: 19,
  houseNumberAddition: "C",
  houseNumberFull: "19c",
};

const {
  locationHouseNumberFull,
  locationFound,
  locationPostalCode,
  locationRestrictionCityScape,
  locationRestrictionMonument,
  locationZoningPlans,
  main,
  navButtonPrev,
  navButtonNext,
} = selectors;

module.exports = {
  [__filename]: async (b) => {
    const { assert } = b;

    b.url(`${domain}/aanbouw-of-uitbouw-maken`);
    assert.titleContains(
      "Invullen adres - Vergunningcheck aanbouw of uitbouw maken"
    );

    assert.containsText(main, "Invullen adres");
    // TODO: test invalid fields feedback
    assert.visible(locationPostalCode);
    b.setValue(locationPostalCode, address.zipCode);
    assert.visible(locationHouseNumberFull);
    b.setValue(locationHouseNumberFull, address.houseNumberFull);
    b.waitForElementVisible(locationFound);
    assert.containsText(main, address.streetName);

    // forward, back, forward
    b.click(navButtonNext);
    b.waitForElementVisible(navButtonPrev);
    b.click(navButtonPrev);
    b.waitForElementVisible(navButtonNext);
    b.click(navButtonNext);

    assert.visible(locationZoningPlans);
    assert.visible(locationRestrictionMonument);
    assert.visible(locationRestrictionCityScape);
    b.click(navButtonNext);

    const result = await b.windowHandles();
    b.switchWindow(result.value[1]);
    assert.urlEquals(
      `https://www.omgevingsloket.nl/Particulier/particulier/home/checken/LocatieWerkzaamheden?param=postcodecheck&facet_locatie_postcode=${address.zipCode}&facet_locatie_huisnummer=${address.houseNumber}&facet_locatie_huisnummertoevoeging=${address.houseNumberAddition}`
    );

    b.waitForElementPresent(oloSelectors.locationForm);
    assert.containsText(
      oloSelectors.locationForm,
      `${address.streetName} ${address.houseNumber}-${address.houseNumberAddition}`
    );
  },
};
