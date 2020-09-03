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
        action: action.toLowerCase(), // @todo: remove all seperate toLowerCase()
        category: category.toLowerCase(), // @todo: remove all seperate toLowerCase()
        name: name.toLowerCase(), // @todo: remove all seperate toLowerCase()
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
