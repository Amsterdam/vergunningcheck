import { Button, themeSpacing } from "@datapunt/asc-ui";
import styled, { css } from "styled-components";

export default styled(Button)`
  align-self: flex-start;
  text-decoration: underline;
  ${(props) =>
    css`
      margin-top: ${props.marginTop ? props.marginTop + "px" : themeSpacing(5)};
      margin-bottom: ${props.marginBottom
        ? props.marginBottom + "px"
        : themeSpacing(5)};
    `}
  @media print {
    display: none;
  }
`;
