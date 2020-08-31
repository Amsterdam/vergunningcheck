import React, { memo } from "react";

import { actions, sections } from "../config/matomo";
import withTracking from "../hoc/withTracking";
import {
  StyledHeader,
  StyledHeaderWrapper,
  StyledLogo,
  StyledLogoWrapper,
} from "./HeaderStyles";

export const Header = ({ matomoTrackEvent, category = sections.INTRO }) => {
  const handleClick = (href) => {
    matomoTrackEvent({
      action: actions.CLICK_EXTERNAL_NAVIGATION,
      category,
      name: "logo - header",
    });
    window.location.href = href;
  };

  return (
    <StyledHeader
      tall
      css={StyledHeaderWrapper}
      logo={() => (
        <StyledLogoWrapper
          onClick={() =>
            handleClick(
              process.env.NODE_ENV === "production"
                ? "https://amsterdam.nl"
                : "/"
            )
          }
          tabIndex={4}
        >
          <StyledLogo />
        </StyledLogoWrapper>
      )}
    />
  );
};

export default memo(withTracking(Header));
