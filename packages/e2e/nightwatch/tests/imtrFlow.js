const { NightwatchBrowser } = require("nightwatch");
const { address, domain, selectors } = require("../config");

const {
  locationHouseNumberFull,
  locationFound,
  locationPostalCode,
  locationRestrictionMonument,
  main,
  navButtonNext,
  q1a1,
  q1a2,
  questionAlert,
  questionForm,
} = selectors;


module.exports = {
  [__filename]: async (b) => {
    const { assert } = b;
    b.url(`${domain}/dakkapel-plaatsen`);

    // Intro page has loaded
    // b.waitForElementVisible(introBullets);
    assert.containsText(
      main,
      "Met de vergunningcheck kunt u zien wanneer u een omgevingsvergunning nodig hebt."
    );
    b.click(navButtonNext);

    // Location Input has loaded
    assert.containsText(
      main,
      "Voer het adres in waar u de dakkapel wilt gaan plaatsen"
    );
    assert.visible(locationPostalCode);
    b.setValue(locationPostalCode, address.zipCode);
    assert.visible(locationHouseNumberFull);
    b.setValue(locationHouseNumberFull, address.houseNumberFull);

    // Address has loaded
    b.waitForElementVisible(locationFound);
    assert.visible(locationRestrictionMonument);
    assert.containsText(main, address.streetName);
    b.click(navButtonNext);

    // Question 1 has loaded
    b.waitForElementVisible(questionForm);
    b.waitForElementVisible(q1a1);
    b.waitForElementVisible(q1a2);
    assert.containsText(main, "Het gebouw is een gemeentelijk monument.");
    assert.containsText(main, "Gaat u een dakkapel plaatsen of vernieuwen?");
    assert.containsText(main, "Volgende vraag");
    b.click(q1a1);
    b.waitForElementVisible(questionAlert);
    b.click(navButtonNext);

    // // Permit outcome has loaded
    // b.waitForElementVisible(outcomeNeedPermitButton);
    // assert.containsText(main, "U hebt een omgevingsvergunning nodig.");
    // assert.containsText(main, "Zo werkt aanvragen");
    // assert.containsText(main, "Uitkomst opslaan");
    // assert.containsText(main, "Nog een vergunningcheck doen");
    // b.click(outcomeNeedPermitButton);
    //
    // // The page `HOW_TO_APPLY_FOR_A_PERMIT` has loaded
    // const result = await b.windowHandles();
    // @ts-ignore
    // b.switchWindow(result.value[1]);
    // // TODO: make this URL available in packages/mocking
    // assert.urlEquals(
    //   "https://www.amsterdam.nl/veelgevraagd/?productid=%7B215DE049-EFA3-492D-A4B1-EDFF40E0BC51%7D#case_%7BBB9A7369-D795-42F8-8505-DC83EE4CC0C0%7D"
    // );
    //
    /**
     *
     * We can extend this test with:
     * - clicking on the Edit location button `LOCATION_MODAL_OPEN_BUTTON`
     * - clicking on the "new checker modal
     * - testing multiple addresses
     * - testing invalid address fields feedback
     *
     */
  },
};