import styled from "styled-components";

import StepByStepItemStyle, { CircleWrapperStyle } from "./StepByStepItemStyle";

export type Props = {
  customCircleSizes?: boolean;
  disableFadeEffect?: boolean;
};

export default styled.div<Props>`
  overflow: hidden;

  ${StepByStepItemStyle} {
    &:first-of-type {
      padding-top: 0;
    }
    &:last-of-type {
      padding-bottom: 0;

      ${CircleWrapperStyle}:after {
        content: none;
      }
    }
  }
`;
