const config = {
  domain: "https://vergunningcheck.amsterdam.nl",
  domain: "http://localhost:3000",
  selectors: {
    locationHouseNumberFull: "input[name=houseNumberFull]",
    locationFound: "[data-testid=location-found]",
    locationPostalCode: "input[name=postalCode]",
    locationZoningPlans: "[data-testid=zoning-plans]",
    locationRestrictionCityScape: "[data-testid=restriction-cityscape]",
    locationRestrictionMonument: "[data-testid=restriction-monument]",
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