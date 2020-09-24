const config = {
  domain: "https://vergunningcheck.amsterdam.nl",
  selectors: {
    locationHouseNumberFull: "input[name=houseNumberFull]",
    locationFound: "[data-testid=location-found]",
    locationPostalCode: "input[name=postalCode]",
    main: "body",
    navButtonPrev: "[data-testid=prev-button]",
    navButtonNext: "[data-testid=next-button]",
  },
  olo: {
    selectors: {
      locationForm: "#locatieWerkzaamhedenForm",
    },
  },
};

module.exports = config;
