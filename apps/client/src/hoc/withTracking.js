import { useMatomo } from "@datapunt/matomo-tracker-react";
import React from "react";

import { sections, trackingEnabled } from "../config/matomo";

const withTracking = (Component) => ({ ...props }) => {
  const { trackEvent, trackPageView } = useMatomo();

  const matomoPageView = () => {
    if (trackingEnabled()) {
      trackPageView({});
    }
  };
  const matomoTrackEvent = ({ category = sections.INTRO, action, name }) => {
    if (trackingEnabled()) {
      trackEvent({
        category,
        action,
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
