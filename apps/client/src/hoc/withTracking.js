import React, { useContext } from "react";
import { SessionContext } from "../context";
import { useMatomo } from "@datapunt/matomo-tracker-react";

const withTracking = (Component) => ({ ...props }) => {
  const { topic } = useContext(SessionContext);
  const { trackEvent, trackPageView } = useMatomo();

  const matomoPageView = () => {
    if (!localStorage.getItem("doNotTrack")) {
      trackPageView({});
    }
  };
  const matomoTrackEvent = ({ category, action, name }) => {
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
      matomoTrackEvent={matomoTrackEvent}
      matomoPageView={matomoPageView}
      {...props}
    />
  );
};

export default withTracking;
