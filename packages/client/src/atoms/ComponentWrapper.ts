import { themeSpacing } from "@amsterdam/asc-ui";
import styled, { css } from "styled-components";

type Props = {
  marginBottom?: number;
};

export default styled.div<Props>`
  ${({ marginBottom }) =>
    css`
      margin-bottom: ${typeof marginBottom === "number"
        ? marginBottom + "px"
        : themeSpacing(6)};
    `}
`;
