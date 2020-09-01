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
  DOWNLOAD: "download",
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
  ADDRESS_ERROR: "adres error",
  ADDRESS_NOT_FOUND: "adres niet gevonden",
  APPLY_FOR_PERMIT: "vergunning aanvragen",
  BACK: "terug naar",
  CONTACT_FORM: "contactformulier",
  CONTACT_OPENING: "contactgegevens en openingstijden",
  COOKIES: "cookies op deze site",
  DESCRIPTION: "toelichting",
  EDIT_ADDRESS: "wijzig adres",
  EDIT_QUESTION: "wijzig vraag",
  FACEBOOK: "facebook",
  FORWARD: "naar de",
  IAMSTERDAM: "iamsterdam.com",
  INSTAGRAM: "instagram",
  LINKEDIN: "linkedin",
  LONG_DESCRIPTION: "lange toelichting",
  LOGO: "logo",
  NEXT: "volgende",
  NEXT_QUESTION: "volgende vraag",
  NEWSLETTER: "nieuwsbrief amsterdam.nl",
  PHONE_NUMBER: "telefoonnummer",
  PREV_QUESTION: "vorige vraag",
  PRIVACY: "privacy",
  SAVE_CONCLUSION: "conclusie opslaan",
  TEXT_LINK: "tekst link",
  TO_OLO: "naar het omgevingsloket",
  TWITTER: "twitter",
  WEBARCHIEF: "webarchief",
  WORK_AT: "werken bij",
};
