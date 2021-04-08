import { Button, ButtonProps, themeSpacing } from "@amsterdam/asc-ui";
import styled, { css } from "styled-components";

type Props = {
  marginBottom?: number;
} & ButtonProps;

export default styled(Button)<Props>`
  ${({ variant }) =>
    variant &&
    variant === "textButton" &&
    css`
      align-self: flex-start;
      font-weight: 400;
      text-decoration: underline;
    `}

  ${({ marginBottom }) =>
    css`
      margin-bottom: ${themeSpacing(marginBottom ?? 0)};
    `}
`;
