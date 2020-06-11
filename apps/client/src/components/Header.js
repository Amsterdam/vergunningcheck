import React from "react";

import {
  StyledHeader,
  StyledHeaderWrapper,
  StyledLogo,
  StyledLogoWrapper,
} from "./HeaderStyles";

export const Header = () => (
  <StyledHeader
    tall
    css={StyledHeaderWrapper}
    logo={() => (
      <StyledLogoWrapper
        href={
          process.env.NODE_ENV === "production" ? "https://amsterdam.nl" : "/"
        }
        tabIndex={4}
      >
        <StyledLogo />
      </StyledLogoWrapper>
    )}
  />
);

export default Header;
