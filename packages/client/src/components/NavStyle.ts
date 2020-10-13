import { Button, Icon, themeColor, themeSpacing } from "@amsterdam/asc-ui";
import styled, { css } from "styled-components";

import { NavProps } from "./Nav";

export const NavStyle = styled.div<NavProps>`
  display: flex;
  height: 64px;
  margin: ${themeSpacing(5, 0, 4)};
  background-color: ${themeColor("tint", "level3")};
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;

  ${(props) =>
    props.noMarginBottom &&
    css`
      margin-bottom: 0;
    `}

  @media print {
    display: none;
  }
`;

export const NextButton = styled(Button).attrs({
  variant: "secondary",
  type: "submit",
})<{ formEnds: boolean }>`
  margin-right: ${({ formEnds }) => (formEnds ? 10 : 25)}px;
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
