import { Link as StyledComponentLink } from "@datapunt/asc-ui";
import React from "react";

import { actions } from "../config/matomo";
import { useTracking } from "../hooks";

type Props = {
  action?: string;
  children: React.ReactNode;
  href?: string;
  eventName: string;
  internal?: boolean;
  variant?: string;
};

const Link = ({
  action = actions.CLICK_EXTERNAL_NAVIGATION,
  children,
  eventName,
  href,
  ...rest
}: Props) => {
  const { matomoTrackEvent } = useTracking();

  const onClick = () => {
    if (eventName) {
      matomoTrackEvent({
        action,
        name: eventName,
      });
    }
  };

  return (
    <StyledComponentLink href={href} onClick={href && onClick} {...rest}>
      {children}
    </StyledComponentLink>
  );
};

export default Link;
