import React from "react";
import {
  StyledHeader,
  StyledHeaderWrapper,
  StyledLogoWrapper,
  StyledLogo,
} from "./HeaderStyles";
import { actions, categories } from "../MatomoConfig";
import withTracking from "../hoc/withTracking";

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
