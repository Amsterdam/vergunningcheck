import styled, { css } from "styled-components";
import { themeSpacing } from "@datapunt/asc-ui";

export default styled.div`
  ${(props) =>
    css`
      margin-bottom: ${props.marginBottom
        ? props.marginBottom + "px"
        : themeSpacing(6)};
    `}
`;
