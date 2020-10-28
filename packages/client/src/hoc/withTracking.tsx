import { useMatomo } from "@datapunt/matomo-tracker-react";
import React from "react";
import { useParams } from "react-router-dom";

import { trackingEnabled } from "../config/matomo";
import { findTopicBySlug } from "../utils";

type MatomoEventProps = {
  action: string;
  category?: string;
  name: string;
};

export type MatomoTrackEventProps = {
  matomoTrackEvent: (arg0: MatomoEventProps) => void;
};

const withTracking = (Component: any) => ({ ...props }) => {
  const { trackEvent, trackPageView } = useMatomo();

  // @TODO: make a withTracking hook instead of this HOC
  const { slug } = useParams<{ slug: string }>();
  const topic = findTopicBySlug(slug);

  const matomoPageView = () => {
    if (trackingEnabled()) {
      trackPageView({});
    }
  };

  const matomoTrackEvent = ({ action, category, name }: MatomoEventProps) => {
    if (trackingEnabled()) {
      trackEvent({
        action: action.toLowerCase(),
        category: (category || topic?.name || slug || "unknown").toLowerCase(),
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
