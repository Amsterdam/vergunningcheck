import LogoDesktop from "../static/media/logo-desktop.svg";
import LogoMobile from "../static/media/logo-mobile.svg";
import styled, { css } from "styled-components";
import { breakpoint, themeSpacing } from "@datapunt/asc-ui";
import { focusOutlineStyle } from "../utils/themeUtils";

import { Header } from "@datapunt/asc-ui";

export const StyledHeader = styled(Header)`
  max-width: 960px;
  padding: 0 ${themeSpacing(5)};

  @media screen and ${breakpoint("min-width", "tabletM")} {
    padding: 0 ${themeSpacing(6)};
  }
  @media screen and ${breakpoint("min-width", "laptop")} {
    padding: 0 ${themeSpacing(8)};
  }
  @media screen and ${breakpoint("min-width", "laptopM")} {
    padding: 0 ${themeSpacing(11)};
  }
`;

export const StyledHeaderWrapper = css`
  position: relative; /* Disable the sticky header */
  z-index: 2;

  @media screen and ${breakpoint("max-width", "laptopM")} {
    height: 115px;
  }
  @media screen and ${breakpoint("max-width", "tabletS")} {
    height: 69px;
  }

  ${StyledHeader} {
    height: 100%; /* Make sure Header is full height */
  }
`;

export const StyledLogo = styled.span`
  display: block;
  height: 100%;
  width: 100%;
  background-size: cover;
  background-image: url("${LogoMobile}");
`;

export const StyledLogoWrapper = styled.a`
  display: inline-block;
  height: 42px;
  width: 135px;
  flex-shrink: 0;
  margin-right: ${themeSpacing(3)};

  @media screen and ${breakpoint("min-width", "tabletS")} {
    height: 68px;
    width: 152px;
    margin-right: ${themeSpacing(10)};
    margin-left: -5px; /* Hack to align logo with content */

    ${StyledLogo} {
      background-image: url("${LogoDesktop}");
    }
  }

  ${focusOutlineStyle}
`;
