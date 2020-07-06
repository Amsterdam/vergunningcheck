import React from "react";

import { STEPBYSTEPNAVIGATION } from "../../utils/test-ids";
import usePassPropsToChildren from "../../utils/usePassPropsToChildren";
import StepByStepNavigationStyle, { Props } from "./StepByStepNavigationStyle";

const StepByStepNavigation: React.FC<
  Props & React.HTMLAttributes<HTMLElement>
> = ({
  children: childrenProps,
  customCircleSizes,
  disableFadeEffect,
  ...otherProps
}) => {
  const { children } = usePassPropsToChildren(childrenProps, {
    customCircleSizes,
    disableFadeEffect,
  });

  if (!childrenProps) return null;

  return (
    <StepByStepNavigationStyle
      {...otherProps}
      data-testid={STEPBYSTEPNAVIGATION}
    >
      {children}
    </StepByStepNavigationStyle>
  );
};

export default StepByStepNavigation;
