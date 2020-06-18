import React from "react";
import {
  StyledHeader,
  StyledHeaderWrapper,
  StyledLogoWrapper,
  StyledLogo,
} from "./HeaderStyles";
import { actions, categories } from "../MatamoConfig";
import withTracking from "../hoc/withTracking";

export const Header = ({ ClickTrackEvent }) => {
  const onClick = (href) => {
    ClickTrackEvent({
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
            onClick(
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
