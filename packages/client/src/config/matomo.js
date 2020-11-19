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
  CONCLUSION_OUTCOME: "dit is de uitkomst",
  DOWNLOAD: "download",
  EDIT_ADDRESS: "wijzig adres",
  EDIT_QUESTION: "wijzig vraag",
  ERROR: "foutmelding",
  OPEN_MODAL: "open modal",
  SUBMIT_CITYSCAPE: "stadsgezicht invoer",
  SUBMIT_DISTRICT: "wijk invoer",
  SUBMIT_LOCATION: "locatie invoer",
  SUBMIT_MONUMENT: "monument invoer",
  SUBMIT_NEIGHBORHOOD: "buurt invoer",
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
  ADDRESS_API_DOWN:
    "de verbinding met de api om adresgegevens op te halen is mislukt",
  ADDRESS_NOT_FOUND:
    "geen adresgegevens gevonden met deze postcodehuisnummer combinatie",
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
  GOTO_LOCATION: "naar locatie",
  GOTO_NEXT_QUESTION: "naar volgende vraag",
  GOTO_PREV_QUESTION: "naar vorige vraag",
  HOW_TO_APPLY_FOR_A_PERMIT: "zo werkt aanvragen",
  HOW_TO_APPLY_FOR_A_DEMOLITION: "zo werkt sloop: melding en vergunning",
  HOW_TO_NOTIFY_A_DEMOLITION: "sloopmelding doen",
  IAMSTERDAM: "iamsterdam.com",
  INSTAGRAM: "instagram",
  LINKEDIN: "linkedin",
  LONG_DESCRIPTION: "lange toelichting vraag",
  LOGO: "logo",
  OPEN_MODAL_EDIT_ADDRESS: "open modal wijzig adres",
  OPEN_MODAL_DO_ANOTHER_CHECK: "open modal nog een vergunningcheck doen",
  NEWSLETTER: "nieuwsbrief amsterdam.nl",
  NO_CHOICE_HAS_BEEN_MADE: "er is geen keuze gemaakt",
  NO_MONUMENT: "geen momument",
  NO_CITYSCAPE: "geen beschermd stads- of dorpsgezicht",
  PRIVACY: "privacy",
  SAVE_CONCLUSION: "conclusie opslaan",
  TEXT_LINK: "tekst link",
  TO_OLO: "naar het omgevingsloket",
  TWITTER: "twitter",
  VIEW_ZONING_PLAN: "bestemmingsplan bekijken",
  WEBARCHIEF: "webarchief",
  WITH_THE_SAME_ADDRESS: "op hetzelfde adres",
  WITHOUT_THE_SAME_ADDRESS: "op een ander adres",
  WORK_AT: "werken bij",
};
