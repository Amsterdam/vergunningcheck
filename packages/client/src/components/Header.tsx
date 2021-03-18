import React, { memo } from "react";

import { actions, eventNames, sections } from "../config/matomo";
import { useTracking } from "../hooks";
import { routes } from "../routes";
import { LOGO_WRAPPER } from "../utils/test-ids";
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
        <StyledLogoWrapper
          data-testid={LOGO_WRAPPER}
          href={homeLink}
          onClick={handleClick}
          tabIndex={0}
        >
          <StyledLogo>Amsterdam.nl</StyledLogo>
        </StyledLogoWrapper>
      )}
      tall
    />
  );
};

export default memo(Header);
