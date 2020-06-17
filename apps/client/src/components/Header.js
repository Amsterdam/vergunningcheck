import React, { useContext } from "react";
import {
  StyledHeader,
  StyledHeaderWrapper,
  StyledLogoWrapper,
  StyledLogo,
} from "./HeaderStyles";
import { actions, categories, ClickTrackEvent } from "../utils/MatamoConfig";

export const Header = () => {
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

export default Header;
