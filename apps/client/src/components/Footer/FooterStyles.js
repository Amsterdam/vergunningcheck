import { breakpoint, themeSpacing } from "@datapunt/asc-ui";
import styled from "styled-components";

export const ContentContainer = styled.div`
  max-width: 960px;
  width: 100%;
  margin: 0 auto;

  @media screen and ${breakpoint("min-width", "tabletS")} and
  ${breakpoint("max-width", "laptop")}
  {
    padding-left: ${themeSpacing(4)};
    padding-right: ${themeSpacing(4)};
  }

  @media print {
    display: none;
  }
`;
