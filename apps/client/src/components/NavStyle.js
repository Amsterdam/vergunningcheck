import styled from "styled-components";
import { Icon, themeSpacing } from "@datapunt/asc-ui";

export const NavStyle = styled.div`
  display: flex;
  height: 64px;
  margin: ${themeSpacing(5, 0, 10)};
  background-color: rgba(241, 241, 241, 1);
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;

  @media print {
    display: none;
  }
`;

/*
Fix for old Firefox versions:
https://stackoverflow.com/questions/35464067/flex-grid-layouts-not-working-on-button-or-fieldset-elements
*/
export const IconContainer = styled.span`
  display: inline-flex;
  align-items: center;
`;

export const IconLeft = styled(Icon)`
  margin-right: ${themeSpacing(1)};
`;
