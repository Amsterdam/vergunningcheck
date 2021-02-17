const { address, domain, selectors } = require("../config");

const {
  locationHouseNumberFull,
  locationFound,
  locationForm,
  locationPostalCode,
  locationRestrictionCityScape,
  locationRestrictionMonument,
  main,
  navButtonPrev,
  navButtonNext,
} = selectors;

module.exports = {
  [__filename]: async (b) => {
    const { assert } = b;

    b.url(`${domain}/aanbouw-of-uitbouw-maken`);
    b.waitForElementVisible(locationPostalCode);

    assert.containsText(main, "Invullen adres");
    // TODO: test invalid fields feedback
    assert.visible(locationPostalCode);
    // b.setValue(locationPostalCode, address.zipCode);
    b.setValue(locationPostalCode, '1055XD');
    assert.visible(locationHouseNumberFull);
    b.setValue(locationHouseNumberFull, "19c");
    // b.setValue(locationHouseNumberFull, address.houseNumberFull);
    b.waitForElementVisible(locationFound);
    // assert.containsText(main, address.streetName);
    assert.containsText(main, "Louise de Colignystraat");

    // forward, back, forward
    b.click(navButtonNext);
    b.waitForElementVisible(navButtonPrev);
    b.click(navButtonPrev);
    b.waitForElementVisible(navButtonNext);
    b.click(navButtonNext);

    assert.visible(locationRestrictionMonument);
    assert.visible(locationRestrictionCityScape);
    b.click(navButtonNext);

    const result = await b.windowHandles();
    b.switchWindow(result.value[1]);
    assert.urlEquals(
      `https://www.omgevingsloket.nl/Particulier/particulier/home/checken/LocatieWerkzaamheden?param=postcodecheck&facet_locatie_postcode=${address.zipCode}&facet_locatie_huisnummer=${address.houseNumber}&facet_locatie_huisnummertoevoeging=${address.houseNumberAddition}`
    );

    b.waitForElementPresent(locationForm);
    assert.containsText(
      locationForm,
      `${address.streetName} ${address.houseNumber}-${address.houseNumberAddition}`
    );
  },
};
