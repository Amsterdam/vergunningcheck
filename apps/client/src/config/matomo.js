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
  CLICK_EXTERNAL_NAVIGATION: "uitgaande links",
  CLICK_INTERNAL_NAVIGATION: "interne navigatie",
  CLICK_PHONE_LINK: "telefoonnummer",
  DOWNLOAD: "download",
  EDIT_QUESTION: "wijzig vraag",
  SUBMIT_LOCATION: "locatie opslaan",
};

export const sections = {
  CONCLUSION: "conclusie",
  FOOTER: "footer",
  HEADER: "header",
  INTRO: "intro",
  LOCATION_INPUT: "locatie invoer",
  LOCATION_RESULT: "locatie resultaat",
  QUESTIONS: "vragen",
};

export const eventNames = {
  ABOUT: "over deze site",
  ACTIVE_QUESTION: "vraag is actief",
  ANSWERED_WITH: "beantwoord met",
  ADDRESS_ERROR: "adres error",
  ADDRESS_NOT_FOUND: "adres niet gevonden",
  APPLY_FOR_PERMIT: "vergunning aanvragen",
  BACK: "terug naar",
  CONTACT_FORM: "contactformulier",
  CONTACT_OPENING: "contactgegevens en openingstijden",
  COOKIES: "cookies op deze site",
  DESCRIPTION: "toelichting",
  EDIT_ADDRESS: "wijzig adres",
  FACEBOOK: "facebook",
  FORWARD: "ga naar",
  GOTO_NEXT_QUESTION: "naar volgende vraag",
  GOTO_PREV_QUESTION: "naar vorige vraag",
  IAMSTERDAM: "iamsterdam.com",
  INSTAGRAM: "instagram",
  LINKEDIN: "linkedin",
  LONG_DESCRIPTION: "lange toelichting",
  LOGO: "logo",
  NEWSLETTER: "nieuwsbrief amsterdam.nl",
  PHONE_NUMBER: "telefoonnummer",
  PRIVACY: "privacy",
  SAVE_CONCLUSION: "conclusie opslaan",
  TEXT_LINK: "tekst link",
  TO_OLO: "naar het omgevingsloket",
  TWITTER: "twitter",
  WEBARCHIEF: "webarchief",
  WORK_AT: "werken bij",
};
