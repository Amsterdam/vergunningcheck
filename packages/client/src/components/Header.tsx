import React, { memo } from "react";

import { actions, eventNames, sections } from "../config/matomo";
import { useTracking } from "../hooks";
import { routes } from "../routes";
import {
  StyledHeader,
  StyledHeaderWrapper,
  StyledLogo,
  StyledLogoWrapper,
} from "./HeaderStyles";

export const Header = () => {
  const { matomoTrackEvent } = useTracking();

  const handleClick = () => {
    matomoTrackEvent({
      action: actions.CLICK_EXTERNAL_NAVIGATION,
      name: `${eventNames.LOGO} - ${sections.HEADER}`,
    });
  };

  const homeLink =
    process.env.NODE_ENV === "production"
      ? "https://amsterdam.nl/"
      : routes.home;

  return (
    <StyledHeader
      css={StyledHeaderWrapper}
      homeLink=""
      logo={() => (
        <StyledLogoWrapper href={homeLink} onClick={handleClick} tabIndex={4}>
          <StyledLogo />
        </StyledLogoWrapper>
      )}
      tall
    />
  );
};

export default memo(Header);
