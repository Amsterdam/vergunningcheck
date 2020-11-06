import { useMatomo } from "@datapunt/matomo-tracker-react";
import { useLocation } from "react-router-dom";

import { trackingEnabled } from "../config/matomo";
import { findTopicBySlug, getSlugFromPathname } from "../utils";

type TrackingProps = {
  action: string;
  category?: string;
  name: string;
};

export default () => {
  /* Get slug and topic from url. Please note this hook can be used when no slug is available.
     Therefore we cannot use useSlug and useTopic, because they throw when not available. */
  const location = useLocation();
  const slug = getSlugFromPathname(location.pathname);
  const topic = findTopicBySlug(slug);

  const { trackEvent, trackPageView } = useMatomo();
  const enabled = trackingEnabled();

  return {
    matomoPageView: () => enabled && trackPageView({}),
    matomoTrackEvent: ({
      action,
      category = topic?.name || slug || "unknown category",
      name,
    }: TrackingProps) =>
      enabled &&
      trackEvent({
        action: action.toLowerCase(),
        category: category.toLowerCase(),
        name: name.toLowerCase(),
      }),
  };
};
