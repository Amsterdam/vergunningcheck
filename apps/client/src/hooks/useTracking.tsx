import { useMatomo } from "@datapunt/matomo-tracker-react";
import { useParams } from "react-router-dom";

import { isProduction } from "../config";
import { trackingEnabled } from "../config/matomo";
import { ParamTypes } from "../routes";
import { noop } from "../utils";
import useTopic from "./useTopic";

type TrackingProps = {
  action: string;
  category?: string;
  name: string;
};

export default () => {
  const { slug } = useParams<ParamTypes>();
  const topic = useTopic();
  const { trackEvent, trackPageView } = useMatomo();

  const matomoTrackEvent = ({
    action,
    category = topic?.name || slug || "unknown category",
    name,
  }: TrackingProps) =>
    trackEvent({
      action: action.toLowerCase(),
      category: category.toLowerCase(),
      name: name.toLowerCase(),
    });

  // `isProduction` => Temporary disable Matomo trackevents on production
  return {
    matomoTrackEvent:
      isProduction && trackingEnabled() ? matomoTrackEvent : noop,
    matomoPageView: trackingEnabled() ? () => trackPageView({}) : noop,
  };
};
