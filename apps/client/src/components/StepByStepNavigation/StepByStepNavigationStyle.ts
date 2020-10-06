import { themeColor } from "@amsterdam/asc-ui";
import styled, { css } from "styled-components";

import StepByStepItemStyle, { CircleWrapperStyle } from "./StepByStepItemStyle";

export type Props = {
  customSize?: boolean;
  disabledTextColor?: any;
  doneTextColor?: any;
  highlightActive?: boolean;
  lineBetweenItems?: boolean;
};

export default styled.div<Props>`
  /* Remove the line (going downwards) only from the last Item */
  ${StepByStepItemStyle} {
    ${({ lineBetweenItems }) =>
      lineBetweenItems &&
      css`
        border-bottom: 1px solid ${themeColor("tint", "level3")};

        &:last-child {
          border-bottom: none;
        }
      `}

    &:last-child ${CircleWrapperStyle}:after {
      content: none;
    }
  }
`;
