import { useMatomo } from "@datapunt/matomo-tracker-react";
import React from "react";
import { useParams } from "react-router-dom";

import { isProduction } from "../config";
import { trackingEnabled } from "../config/matomo";
import { findTopicBySlug } from "../utils";

const withTracking = (Component) => ({ ...props }) => {
  const { trackEvent, trackPageView } = useMatomo();

  // This is a temporary fix
  // @TODO: make a withTracking hook instead of this HOC
  const { slug } = useParams();
  const topic = findTopicBySlug(slug);

  const matomoPageView = () => {
    if (trackingEnabled()) {
      trackPageView({});
    }
  };

  const matomoTrackEvent = ({ action, category = topic.name, name }) => {
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
