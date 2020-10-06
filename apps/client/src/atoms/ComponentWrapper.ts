import { themeSpacing } from "@amsterdam/asc-ui";
import styled, { css } from "styled-components";

type Props = {
  marginBottom?: number;
};

export default styled.div<Props>`
  ${(props) =>
    css`
      margin-bottom: ${props.marginBottom
        ? props.marginBottom + "px"
        : themeSpacing(6)};
    `}
`;
