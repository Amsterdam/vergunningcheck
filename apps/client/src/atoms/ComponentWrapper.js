import { themeSpacing } from "@datapunt/asc-ui";
import styled, { css } from "styled-components";

export default styled.div`
  ${(props) =>
    css`
      margin-bottom: ${props.marginBottom
        ? props.marginBottom + "px"
        : themeSpacing(6)};
    `}
`;
