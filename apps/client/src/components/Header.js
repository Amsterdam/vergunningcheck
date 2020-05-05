import React from "react";
import {
  StyledHeader,
  StyledHeaderWrapper,
  StyledLogoWrapper,
  StyledLogo,
} from "./HeaderStyles";

export const Header = ({ showLinks }) => (
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
