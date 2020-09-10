import { themeSpacing } from "@datapunt/asc-ui";
import styled, { css } from "styled-components";

type Props = {
  marginBottom?: number;
};

export default styled.div<Props>`
  ${({ marginBottom }) =>
    css`
      margin-bottom: ${marginBottom ? marginBottom + "px" : themeSpacing(6)};
    `}
`;
