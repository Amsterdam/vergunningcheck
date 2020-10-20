const config = {
  domain: "http://localhost:3000", // @TODO read from environment variable
  selectors: {
    conclusionContact: "[data-testid=need-contact]",
    conclusionNeedPermitButton: "[data-testid=need-permit-button]",
    introBullets: "[data-testid=intro-usable-for-bullets]",
    locationHouseNumberFull: "input[name=houseNumberFull]",
    locationFound: "[data-testid=location-found]",
    locationPostalCode: "input[name=postalCode]",
    locationRestrictionCityScape: "[data-testid=restriction-cityscape]",
    locationRestrictionMonument: "[data-testid=restriction-monument]",
    main: "body",
    navButtonPrev: "[data-testid=prev-button]",
    navButtonNext: "[data-testid=next-button]",
    q1a1: "[data-testid=q1-a1]",
    q1a2: "[data-testid=q1-a2]",
    q2a1: "[data-testid=q2-a1]",
    questionAlert: "[role=alert]",
    questionEditButton: "[data-testid=edit-button",
    questionForm: "[data-testid=question-form]",
  },
  olo: {
    selectors: {
      locationForm: "#locatieWerkzaamhedenForm",
    },
  },
};

module.exports = config;
