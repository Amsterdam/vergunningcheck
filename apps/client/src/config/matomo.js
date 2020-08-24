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

export const categories = {
  navigate: "navigeren",
};

export const actions = {
  clickExternalLink: "Externe link",
  clickPhoneLink: "Telefoonnummer",
};

export const eventNames = {
  ADDRESS_ERROR: "Address error",
  ADDRESS_NOT_FOUND: "Address not found",
  FOOTER: "Footer",
  INTRO: "Intro",
  INTRO_EXTRAORDINARY: "Intro - Extraordinary situation",
  INTRO_SPLIT_HOUSE: "Intro - Split house",
};
