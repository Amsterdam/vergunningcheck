import { useMatomo } from "@datapunt/matomo-tracker-react";

import { trackingEnabled } from "../config/matomo";
import useTopic from "./useTopic";
import { useSlug } from ".";

type TrackingProps = {
  action: string;
  category?: string;
  name: string;
};

export default () => {
  const slug = useSlug();
  const topic = useTopic();
  const { trackEvent, trackPageView } = useMatomo();
  const enabled = trackingEnabled();

  const matomoTrackEvent = ({
    action,
    category = topic?.name || slug || "unknown category",
    name,
  }: TrackingProps) => {
    if (enabled) {
      trackEvent({
        action: action.toLowerCase(),
        category: category.toLowerCase(),
        name: name.toLowerCase(),
      });
    }
  };
  const matomoPageView = () => {
    if (enabled) {
      trackPageView({});
    }
  };

  return {
    matomoTrackEvent,
    matomoPageView,
  };
};
