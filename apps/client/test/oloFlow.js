module.exports = {
  "Demo test vergunningcheck": (browser) => {
    browser
      .url("http://localhost:3000/aanbouw-of-uitbouw-maken")
      .assert.titleContains(
        "Inleiding - Vergunningcheck aanbouw of uitbouw maken"
      )

      // forward, back, froward
      .click("[data-testid=next-button]")
      .waitForElementVisible("[data-testid=prev-button]")
      .click("[data-testid=prev-button]")
      .click("[data-testid=prev-button]") // BUG: click 2 times; issue in ui bothering user the zip-code field is invalid
      .assert.containsText(
        "body",
        "U gebruikt deze informatie om de vergunningcheck te doen op het Omgevingsloket."
      )
      .click("[data-testid=next-button]")
      .assert.titleContains(
        "Vragen en conclusie - Vergunningcheck aanbouw of uitbouw maken"
      )

      .assert.containsText("body", "Invullen adres")
      // TODO: test invalid fields feedback
      .assert.visible("input[name=postalCode]")
      .setValue("input[name=postalCode]", "1055xd")
      .assert.visible("input[name=houseNumberFull]")
      .setValue("input[name=houseNumberFull]", "19c")
      .waitForElementVisible("[data-testid=location-found]")
      .assert.containsText("body", "Louise de Colignystraat")

      // forward, back, froward
      .click("[data-testid=next-button]")
      .waitForElementVisible("[data-testid=prev-button]")
      .click("[data-testid=prev-button]")
      .waitForElementVisible("[data-testid=next-button]")
      .click("[data-testid=next-button]")

      .assert.containsText("body", "Paraplubestemmingsplan Stadsdeel West")
      .assert.containsText("body", "Het gebouw is een gemeentelijk monument.")
      .assert.containsText(
        "body",
        "Het gebouw ligt niet in een beschermd stads- of dorpsgezicht."
      )

      .click("[data-testid=next-button]")

      .windowHandles((result) => browser.switchWindow(result.value[1]))
      .assert.urlEquals(
        "https://www.omgevingsloket.nl/Particulier/particulier/home/checken/LocatieWerkzaamheden?param=postcodecheck&facet_locatie_postcode=1055XD&facet_locatie_huisnummer=19&facet_locatie_huisnummertoevoeging=C"
      )
      .waitForElementPresent("#locatieWerkzaamhedenForm")
      .assert.containsText(
        "#locatieWerkzaamhedenForm",
        "Louise de Colignystraat 19-C"
      )
      .end();
  },
};
