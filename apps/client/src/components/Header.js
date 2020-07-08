import React from "react";

import withTracking from "../hoc/withTracking";
import { actions, categories } from "../MatomoConfig";
import {
  StyledHeader,
  StyledHeaderWrapper,
  StyledLogo,
  StyledLogoWrapper,
} from "./HeaderStyles";

export const Header = ({ matomoTrackEvent }) => {
  const handleClick = (href) => {
    matomoTrackEvent({
      category: categories.navigate,
      action: actions.clickExternalLink,
      name: "Logo - Header",
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

export default withTracking(Header);
