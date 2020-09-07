import { useMatomo } from "@datapunt/matomo-tracker-react";
import React from "react";

import { isProduction } from "../config";
import { trackingEnabled } from "../config/matomo";
import { useTopic } from "../hooks";

const withTracking = (Component) => ({ ...props }) => {
  const { slug } = useTopic() || {};
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
        category,
        action: `${action} - ${slug || "home"}`,
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
