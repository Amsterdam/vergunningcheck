import { Link as StyledComponentLink } from "@amsterdam/asc-ui";
import React, { ComponentProps } from "react";

import { actions } from "../config/matomo";
import { useTracking } from "../hooks";

type LinkProps = {
  action?: string;
  eventName: string;
};

const Link = ({
  action = actions.CLICK_EXTERNAL_NAVIGATION,
  children,
  eventName,
  href,
  ...rest
}: LinkProps & ComponentProps<typeof StyledComponentLink>) => {
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
