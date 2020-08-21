import { useMatomo } from "@datapunt/matomo-tracker-react";
import React, { useContext } from "react";

import { trackingEnabled } from "../config/matomo";
import { CheckerContext } from "../context";

const withTracking = (Component) => ({ ...props }) => {
  const { topic } = useContext(CheckerContext);
  const { trackEvent, trackPageView } = useMatomo();

  const matomoPageView = () => {
    if (trackingEnabled()) {
      trackPageView({});
    }
  };
  const matomoTrackEvent = ({ category, action, name }) => {
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
