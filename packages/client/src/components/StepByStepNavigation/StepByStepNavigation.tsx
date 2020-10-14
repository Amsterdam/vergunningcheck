import { themeColor } from "@amsterdam/asc-ui";
import React from "react";

import passPropsToChildren from "../../utils/passPropsToChildren";
import { STEPBYSTEPNAVIGATION } from "../../utils/test-ids";
import StepByStepNavigationStyle, { Props } from "./StepByStepNavigationStyle";

const StepByStepNavigation: React.FC<
  Props & React.HTMLAttributes<HTMLElement>
> = ({
  children: childrenProp,
  customSize,
  disabledTextColor,
  doneTextColor,
  highlightActive,
  ...otherProps
}) => {
  if (!childrenProp) {
    return null;
  }

  // Pass the props defined below to all the children
  const { children } = passPropsToChildren(childrenProp, {
    customSize,
    disabledTextColor,
    doneTextColor,
    highlightActive,
  });

  return (
    <StepByStepNavigationStyle
      aria-labelledby="menubutton"
      aria-live="polite"
      data-testid={STEPBYSTEPNAVIGATION}
      role="menu"
      {...otherProps}
    >
      {children}
    </StepByStepNavigationStyle>
  );
};

StepByStepNavigation.defaultProps = {
  disabledTextColor: themeColor("tint", "level5"),
  doneTextColor: themeColor("tint", "level4"),
} as Props;

export default StepByStepNavigation;
