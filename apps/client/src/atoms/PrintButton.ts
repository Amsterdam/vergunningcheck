import { Button, themeSpacing } from "@datapunt/asc-ui";
import styled, { css } from "styled-components";

type Props = {
  marginBottom?: number;
  marginTop?: number;
};

export default styled(Button)<Props>`
  align-self: flex-start;
  text-decoration: underline;
  font-weight: 400;
  ${(props) =>
    css`
      margin-top: ${props.marginTop ? props.marginTop + "px" : themeSpacing(5)};
      margin-bottom: ${props.marginBottom
        ? props.marginBottom + "px"
        : themeSpacing(5)};
    `}
`;
