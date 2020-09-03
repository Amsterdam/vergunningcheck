import { useMatomo } from "@datapunt/matomo-tracker-react";
import React from "react";

import { isProduction } from "../config";
import { trackingEnabled } from "../config/matomo";

const withTracking = (Component) => ({ ...props }) => {
  const { trackEvent, trackPageView } = useMatomo();

  const matomoPageView = () => {
    if (trackingEnabled()) {
      trackPageView({});
    }
  };

  const matomoTrackEvent = ({ action, category, name }) => {
    // Temporary disable Matomo trackevents on production
    if (isProduction) {
      return;
    }

    // eslint-disable-next-line no-unreachable
    if (trackingEnabled()) {
      trackEvent({
        action: action.toLowerCase(),
        category: category.toLowerCase(),
        name: name.toLowerCase(),
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
