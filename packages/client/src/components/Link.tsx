import { Link as UILink } from "@amsterdam/asc-ui";
import React from "react";

import { actions } from "../config/matomo";
import withTracking, { MatomoTrackEventProps } from "../hoc/withTracking";

type LinkProps = {
  action: string;
  children: React.ReactChildren;
  eventName: string;
  href: string;
};

const Link = ({
  action,
  children,
  eventName,
  href,
  matomoTrackEvent,
  ...otherLinkProps
}: LinkProps & React.ComponentProps<typeof UILink> & MatomoTrackEventProps) => {
  const onClick = () => {
    if (eventName) {
      matomoTrackEvent({
        action: action || actions.CLICK_EXTERNAL_NAVIGATION,
        name: eventName,
      });
    }
  };

  return (
    <UILink href={href} onClick={href && onClick} {...otherLinkProps}>
      {children}
    </UILink>
  );
};

export default withTracking(Link);
