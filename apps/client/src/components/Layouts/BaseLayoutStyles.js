import styled from "styled-components";
import { themeColor, themeSpacing, breakpoint } from "@datapunt/asc-ui";

export const Container = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  background-color: white;
`;

export const ContentContainer = styled.div`
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
  background-color: white;

  @media screen and ${breakpoint("min-width", "tabletS")} {
    padding: 0 25px;
  }
`;

export const FormTitle = styled.h4`
  margin: ${themeSpacing(6, 0)};
  padding-bottom: 6px;
  border-bottom: 1px solid ${themeColor("tint", "level5")};
  color: ${themeColor("tint", "level5")};
`;

export const Content = styled.div`
  display: block;
  width: 100%;
`;
