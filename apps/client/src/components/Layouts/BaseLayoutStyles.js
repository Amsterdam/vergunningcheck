import { breakpoint, themeSpacing } from "@datapunt/asc-ui";
import styled from "styled-components";

export const Container = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  background-color: white;
  overflow: hidden;
`;

export const ContentContainer = styled.div`
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
  background-color: white;

  @media screen and ${breakpoint("min-width", "tabletS")} and
  ${breakpoint("max-width", "laptop")}
  {
    padding-left: ${themeSpacing(4)};
    padding-right: ${themeSpacing(4)};
  }
`;

export const Content = styled.div`
  display: block;
  width: 100%;
`;
