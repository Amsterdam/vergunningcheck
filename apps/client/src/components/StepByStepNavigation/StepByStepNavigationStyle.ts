import styled from "styled-components";

import StepByStepItemStyle, { CircleWrapperStyle } from "./StepByStepItemStyle";

export type Props = {
  customSize?: boolean;
  disabledTextColor?: any;
  doneTextColor?: any;
  highlightActive?: boolean;
};

export default styled.div<Props>`
  ${StepByStepItemStyle} {
    &:last-child {
      padding-bottom: 0;

      ${CircleWrapperStyle}:after {
        content: none;
      }
    }
  }
`;
