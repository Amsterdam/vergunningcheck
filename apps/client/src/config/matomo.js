import { isProduction } from ".";

const matomoSiteId = {
  production: 29,
  acceptence: 37,
};

export const getMatomoSiteId = (isProduction) =>
  isProduction ? matomoSiteId.production : matomoSiteId.acceptence;

export const matomo = {
  urlBase: "https://analytics.data.amsterdam.nl/",
  siteId: getMatomoSiteId(isProduction),
};

export const trackingEnabled = () => !localStorage.getItem("doNotTrack");

export const actions = {
  CLICK_EXTERNAL_NAVIGATION: "externe navigatie",
  CLICK_INTERNAL_NAVIGATION: "interne navigatie",
  CLICK_PHONE_LINK: "telefoonnummer",
  CONCLUSION: "tonen conclusie",
  DOWNLOAD: "download",
  EDIT_ADDRESS: "wijzig adres",
  EDIT_QUESTION: "wijzig vraag",
};

export const sections = {
  CONCLUSION: "conclusie",
  CONTACT_CONCLUSION: "contact conclusie",
  INTRO: "intro",
  LOCATION_RESULT: "locatie resultaat",
};

export const eventNames = {
  ADDRESS_ERROR: "adres error",
  ADDRESS_NOT_FOUND: "adres niet gevonden",
  APPLY_FOR_PERMIT: "vergunning aanvragen",
  BACK: "terug naar",
  DESCRIPTION: "toelichting",
  FOOTER: "footer",
  FORWARD: "naar de",
  INTRO: "intro",
  INTRO_EXTRAORDINARY: "extraordinary situation",
  LONG_DESCRIPTION: "lange toelichting",
  NEXT_QUESTION: "volgende vraag",
  PHONE_NUMBER: "telefoonnummer",
  PREV_QUESTION: "vorige vraag",
  SAVE_CONCLUSION: "conclusie opslaan",
  TEXT_LINK: "tekst link",
};
