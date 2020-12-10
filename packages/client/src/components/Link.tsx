import { Link as StyledComponentLink } from "@amsterdam/asc-ui";
import React, { ReactNode } from "react";

import { actions } from "../config/matomo";
import { useTracking } from "../hooks";

type Props = {
  action?: string;
  children: ReactNode;
  darkBackground?: boolean;
  href?: string;
  eventName: string;
  internal?: boolean;
  inList?: boolean;
  strong?: boolean;
  variant?: string | null;
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
