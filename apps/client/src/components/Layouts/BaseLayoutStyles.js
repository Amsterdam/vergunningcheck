import { breakpoint, themeColor, themeSpacing } from "@datapunt/asc-ui";
import styled from "styled-components";

export const Container = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  background-color: ${themeColor("tint", "level1")};
  overflow: hidden;

  /* Try to fit as much as possible on one paper */
  @media print {
    zoom: 0.7;
  }
`;

export const ContentContainer = styled.div`
  max-width: 960px;
  width: 100%;
  margin: 0 auto ${themeSpacing(18)};
  padding-left: ${themeSpacing(4)};
  padding-right: ${themeSpacing(4)};
  background-color: ${themeColor("tint", "level1")};

  @media screen and ${breakpoint("min-width", "tabletS")} {
    padding-left: ${themeSpacing(9)};
    padding-right: ${themeSpacing(9)};
  }
  @media screen and ${breakpoint("min-width", "tabletM")} {
    padding-left: ${themeSpacing(10)};
    padding-right: ${themeSpacing(10)};
  }
  @media screen and ${breakpoint("min-width", "laptop")} {
    padding-left: ${themeSpacing(8)};
    padding-right: ${themeSpacing(8)};
  }
`;

export const Content = styled.div`
  display: block;
  width: 100%;
`;
