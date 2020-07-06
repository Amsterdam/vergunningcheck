import { Checkmark } from "@datapunt/asc-assets";
import { Heading, Paragraph } from "@datapunt/asc-ui";
import React from "react";

import { STEPBYSTEPITEM } from "../../utils/test-ids";
import StepByStepItemStyle, {
  CircleStyle,
  CircleWrapperStyle,
  ContentWrapperStyle,
  Props,
} from "./StepByStepItemStyle";

const StepByStepItem: React.FC<Props & React.HTMLAttributes<HTMLElement>> = ({
  active,
  checked,
  circleBackground,
  customCircleSizes,
  disableFadeEffect,
  done: doneProp,
  children,
  small: smallProp,
  title,
  titleProps,
  ...otherProps
}) => {
  if (!title) return null;
  const small =
    (customCircleSizes && smallProp) || (!customCircleSizes && !active);
  const done = (doneProp || checked) && !active;
  return (
    <StepByStepItemStyle {...{ title }} {...otherProps}>
      <CircleWrapperStyle {...{ checked, done }} data-testid={STEPBYSTEPITEM}>
        <CircleStyle
          size={13}
          {...{ active, checked, circleBackground, done, small }}
        >
          {checked && <Checkmark />}
        </CircleStyle>
      </CircleWrapperStyle>
      <ContentWrapperStyle {...{ disableFadeEffect, done }}>
        {small ? (
          <Paragraph gutterBottom={children ? 12 : 0} {...titleProps}>
            {title}
          </Paragraph>
        ) : (
          <Heading
            forwardedAs="h3"
            gutterBottom={children ? 12 : 0}
            {...titleProps}
          >
            {title}
          </Heading>
        )}
        {children}
      </ContentWrapperStyle>
    </StepByStepItemStyle>
  );
};

export default StepByStepItem;
