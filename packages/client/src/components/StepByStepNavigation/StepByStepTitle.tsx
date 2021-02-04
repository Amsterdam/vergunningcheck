import { Heading, Paragraph } from "@amsterdam/asc-ui";
import React, { FunctionComponent, HTMLAttributes } from "react";

import { StepByStepItemProps } from "./StepByStepItem";

const StepByStepTitle: FunctionComponent<
  StepByStepItemProps & HTMLAttributes<HTMLElement>
> = ({ children, customSize, heading, headingProps, small }) =>
  small ? (
    <Paragraph
      gutterBottom={children ? 12 : 0}
      strong={customSize}
      {...headingProps}
    >
      {heading}
    </Paragraph>
  ) : (
    <Heading
      forwardedAs="h3"
      gutterBottom={children ? 12 : 0}
      {...headingProps}
    >
      {heading}
    </Heading>
  );
export default StepByStepTitle;
