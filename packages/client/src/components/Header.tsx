import React, { memo } from "react";

import { actions, eventNames, sections } from "../config/matomo";
import { useTracking } from "../hooks";
import {
  StyledHeader,
  StyledHeaderWrapper,
  StyledLogo,
  StyledLogoWrapper,
} from "./HeaderStyles";

export const Header = () => {
  const { matomoTrackEvent } = useTracking();
  const homeLink =
    process.env.NODE_ENV === "production" ? "https://amsterdam.nl" : "/";

  const handleClick = () => {
    matomoTrackEvent({
      action: actions.CLICK_EXTERNAL_NAVIGATION,
      name: `${eventNames.LOGO} - ${sections.HEADER}`,
    });
    window.location.href = homeLink;
  };

  return (
    <StyledHeader
      homeLink={homeLink}
      tall
      css={StyledHeaderWrapper}
      logo={() => (
        <StyledLogoWrapper onClick={handleClick} tabIndex={4}>
          <StyledLogo />
        </StyledLogoWrapper>
      )}
    />
  );
};

export default memo(Header);
