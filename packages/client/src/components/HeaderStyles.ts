import { Header, breakpoint, themeSpacing } from "@amsterdam/asc-ui";
import styled, { css } from "styled-components";

import LogoDesktop from "../static/media/logo-desktop.svg";
import LogoMobile from "../static/media/logo-mobile.svg";

export const StyledHeader = styled(Header)`
  max-width: 960px;
  padding: 0 ${themeSpacing(4)};

  @media ${breakpoint("min-width", "tabletS")} {
    padding: 0 ${themeSpacing(5)};
  }
  @media ${breakpoint("min-width", "tabletM")} {
    padding: 0 ${themeSpacing(6)};
  }
  @media ${breakpoint("min-width", "laptop")} {
    padding: 0 ${themeSpacing(8)};
  }

  @media print {
    -webkit-print-color-adjust: exact;
  }
`;

export const StyledHeaderWrapper = css`
  position: relative; /* Disable the sticky header */
  z-index: 2;

  @media ${breakpoint("max-width", "laptopM")} {
    height: 115px;
  }
  @media ${breakpoint("max-width", "tabletS")} {
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
  cursor: pointer;
  background-size: cover;
  background-image: url("${LogoMobile}");
`;

export const StyledLogoWrapper = styled.a`
  display: inline-block;
  height: 42px;
  width: 135px;
  flex-shrink: 0;
  margin-right: ${themeSpacing(3)};

  @media ${breakpoint("min-width", "tabletS")} {
    /* Hack to align logo with content */
    margin-left: calc(-30px + ${themeSpacing(4)});
  }

  @media ${breakpoint("min-width", "laptop")} {
    /* Hack to align logo with content */
    margin-left: -30px;
  }

  @media ${breakpoint("min-width", "tabletS")} {
    height: 68px;
    width: 152px;
    margin-right: ${themeSpacing(10)};

    ${StyledLogo} {
      background-image: url("${LogoDesktop}");
    }
  }

  @media print {
    -webkit-print-color-adjust: exact;
  }
`;
