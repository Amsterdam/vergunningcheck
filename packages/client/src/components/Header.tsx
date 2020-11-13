import React, { memo } from "react";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    matomoTrackEvent({
      action: actions.CLICK_EXTERNAL_NAVIGATION,
      name: `${eventNames.LOGO} - ${sections.HEADER}`,
    });
    if (process.env.NODE_ENV !== "production") {
      e.preventDefault();
      history.push(routes.home);
    }
  };

  return (
    <StyledHeader
      homeLink="https://amsterdam.nl/"
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
