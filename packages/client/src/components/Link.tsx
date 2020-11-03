import { Typography, Link as UILink } from "@amsterdam/asc-ui";
import React from "react";

import { actions } from "../config/matomo";
import withTracking from "../hoc/withTracking";

type LinkProps = {
  action: string;
  eventName: string;
  href: string;
  matomoTrackEvent: any; // @TODO: replace with Matomo props
};

const Link = ({
  action,
  children,
  eventName,
  href,
  matomoTrackEvent,
  ...otherLinkProps
}: LinkProps &
  typeof UILink &
  typeof Typography &
  React.HTMLAttributes<HTMLElement>) => {
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
