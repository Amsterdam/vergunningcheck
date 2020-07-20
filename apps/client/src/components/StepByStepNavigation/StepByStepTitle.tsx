import { Heading, Paragraph } from "@datapunt/asc-ui";
import React from "react";

import { Props } from "./StepByStepItemStyle";

const StepByStepTitle: React.FC<Props & React.HTMLAttributes<HTMLElement>> = ({
  children,
  customSize,
  heading,
  headingProps,
  small,
}) =>
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
