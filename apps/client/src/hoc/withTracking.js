import { useMatomo } from "@datapunt/matomo-tracker-react";
import React, { useContext } from "react";

import { trackingEnabled } from "../config/matomo";
import { CheckerContext } from "../context";

const withTracking = (Component) => ({ ...props }) => {
  const { topic } = useContext(CheckerContext);
  const { trackEvent, trackPageView } = useMatomo();

  const matomoPageView = () => {
    console.log("matomoPageView");
    if (trackingEnabled()) {
      trackPageView({});
    }
  };
  const matomoTrackEvent = ({ action, category, name }) => {
    // Temporary disable Matomo trackevents
    return;

    // eslint-disable-next-line no-unreachable
    if (trackingEnabled()) {
      trackEvent({
        category,
        action: `${action} - ${topic?.slug || "home"}`,
        name,
      });
    }
  };

  return (
    <Component
      matomoTrackEvent={matomoTrackEvent}
      matomoPageView={matomoPageView}
      {...props}
    />
  );
};

export default withTracking;
