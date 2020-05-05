import { css } from "styled-components";
import { themeColor } from "@datapunt/asc-ui";

export const outlineStyle = css`
  outline-color: ${themeColor("support", "focus")};
  outline-style: solid;
  outline-offset: 3px;
  outline-width: 3px;
`;

export const focusOutlineStyle = css`
  &:focus {
    ${outlineStyle}
  }
`;
