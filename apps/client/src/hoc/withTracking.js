import { useMatomo } from "@datapunt/matomo-tracker-react";
import React from "react";

import { trackingEnabled } from "../config/matomo";

const withTracking = (Component) => ({ ...props }) => {
  const { trackEvent, trackPageView } = useMatomo();

  const matomoPageView = () => {
    if (trackingEnabled()) {
      trackPageView({});
    }
  };

  const matomoTrackEvent = ({ action, category, name }) => {
    if (trackingEnabled()) {
      trackEvent({
        action,
        category,
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
