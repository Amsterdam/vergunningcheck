import { isProduction } from "../config";
import { useMatomo } from "@datapunt/matomo-tracker-react";
import { useContext } from "react";
import Context from "../context";

const matomoSiteId = {
  production: 29,
  acceptence: 37,
};

export const isProductionAndNotOurs =
  isProduction && !localStorage.getItem("enterFromDev");

export const ClickTrackEvent = ({ category, action, name }) => {
  const { trackEvent } = useMatomo();
  const { topic } = useContext(Context);

  if (isProductionAndNotOurs) {
    trackEvent({
      category,
      action: `${action} - ${topic.slug || "home"}`,
      name,
    });
  }
};

export const getMatomoSiteId = (isProduction) =>
  isProduction ? matomoSiteId.production : matomoSiteId.acceptence;

export const matomo = {
  urlBase: "https://analytics.data.amsterdam.nl/",
  siteId: getMatomoSiteId(isProduction),
};

export const categories = {
  navigate: "navigeren",
};

export const actions = {
  clickExternalLink: "Externe link",
};
