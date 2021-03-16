import { Link as StyledComponentLink } from "@amsterdam/asc-ui";
import React, { ComponentProps } from "react";
import styled, { css } from "styled-components";

import { actions } from "../config/matomo";
import { useTracking } from "../hooks";

export type LinkProps = {
  action?: string;
  eventName: string;
  underline?: boolean;
} & ComponentProps<typeof StyledComponentLink>;

const StyledLink = styled(StyledComponentLink)<LinkProps>`
  ${({ underline }) =>
    underline &&
    css`
      text-decoration: underline;
    `}
`;

const Link = ({
  action = actions.CLICK_EXTERNAL_NAVIGATION,
  children,
  eventName,
  href,
  underline,
  ...rest
}: LinkProps) => {
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
    <StyledLink
      href={href}
      onClick={href && onClick}
      underline={underline}
      {...rest}
    >
      {children}
    </StyledLink>
  );
};

export default Link;
