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
  ACTIVE_STEP: "actieve stap",
  CLICK_EXTERNAL_NAVIGATION: "uitgaande links",
  CLICK_INTERNAL_NAVIGATION: "interne navigatie",
  CLICK_PHONE_LINK: "14 020 bellen",
  DOWNLOAD: "download",
  EDIT_QUESTION: "wijzig vraag",
  OPEN_MODAL: "open modal",
  SUBMIT_LOCATION: "locatie invoer",
  START_ANOTHER_CHECK: "start een andere vergunningcheck",
};

export const sections = {
  ALERT_ADDRESS_NOT_FOUND:
    "we kunnen geen adres vinden bij deze combinatie (melding)",
  ALERT_LOCATION_INPUT: "we kunnen nu geen adresgegevens ophalen (melding)",
  CONCLUSION: "conclusie",
  FOOTER: "footer",
  HEADER: "header",
  INTRO: "intro pagina",
  LOCATION_INPUT: "locatie invoer",
  LOCATION_RESULT: "locatie resultaat",
  QUESTIONS: "vragen",
};

export const eventNames = {
  ABOUT: "over deze site",
  ACTIVE_QUESTION: "vraag is actief",
  ANSWERED_WITH: "beantwoord met",
  APPLY_FOR_PERMIT: "vergunning aanvragen",
  BACK: "terug naar",
  CONTACT_FORM: "contactformulier",
  CONTACT_OPENING: "contactgegevens en openingstijden",
  COOKIES: "cookies op deze site",
  DESCRIPTION: "toelichting vraag",
  DO_ANOTHER_CHECK: "nog een vergunningcheck doen",
  EDIT_ADDRESS: "wijzig adres",
  FACEBOOK: "facebook",
  FORWARD: "ga naar",
  GOTO_CONCLUSION: "naar conclusie",
  GOTO_NEXT_QUESTION: "naar volgende vraag",
  GOTO_PREV_QUESTION: "naar vorige vraag",
  IAMSTERDAM: "iamsterdam.com",
  INSTAGRAM: "instagram",
  LINKEDIN: "linkedin",
  LONG_DESCRIPTION: "lange toelichting vraag",
  LOGO: "logo",
  NEWSLETTER: "nieuwsbrief amsterdam.nl",
  NO_CHOICE_HAS_BEEN_MADE: "er is geen keuze gemaakt",
  PRIVACY: "privacy",
  SAVE_CONCLUSION: "conclusie opslaan",
  TEXT_LINK: "tekst link",
  TO_OLO: "naar het omgevingsloket",
  TWITTER: "twitter",
  WEBARCHIEF: "webarchief",
  WITH_THE_SAME_ADDRESS: "op hetzelfde adres",
  WITHOUT_THE_SAME_ADDRESS: "op een ander adres",
  WORK_AT: "werken bij",
};
