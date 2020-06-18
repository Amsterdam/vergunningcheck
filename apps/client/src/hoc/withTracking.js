import React, { useContext } from "react";
import Context from "../context";
import { useMatomo } from "@datapunt/matomo-tracker-react";

const withTracking = (Component) => ({ ...props }) => {
  const { topic } = useContext(Context);
  const { trackEvent } = useMatomo();

  const ClickTrackEvent = ({ category, action, name }) => {
    if (!localStorage.getItem("doNotTrack")) {
      console.log("adssad");
      trackEvent({
        category,
        action: `${action} - ${topic.slug || "home"}`,
        name,
      });
    }
  };

  return <Component ClickTrackEvent={ClickTrackEvent} {...props} />;
};

export default withTracking;
