import styled from "styled-components";

import StepByStepItemStyle, { CircleWrapperStyle } from "./StepByStepItemStyle";

export type Props = {
  customSize?: boolean;
  disabledTextColor?: any;
  doneTextColor?: any;
  highlightActive?: boolean;
};

export default styled.div<Props>`
  /* Remove the line (going downwards) only from the last Item */
  ${StepByStepItemStyle}:last-child ${CircleWrapperStyle}:after {
    content: none;
  }
`;
