import React, { useContext } from "react";
import Context from "../context";
import { useMatomo } from "@datapunt/matomo-tracker-react";

const withTracking = (Component) => ({ ...props }) => {
  const { topic } = useContext(Context);
  const { trackEvent, trackPageView } = useMatomo();

  const MatomoPageView = () => {
    if (!localStorage.getItem("doNotTrack")) {
      trackPageView({});
    }
  };
  const MatomoTrackEvent = ({ category, action, name }) => {
    if (!localStorage.getItem("doNotTrack")) {
      trackEvent({
        category,
        action: `${action} - ${topic.slug || "home"}`,
        name,
      });
    }
  };

  return (
    <Component
      MatomoTrackEvent={MatomoTrackEvent}
      MatomoPageView={MatomoPageView}
      {...props}
    />
  );
};

export default withTracking;
