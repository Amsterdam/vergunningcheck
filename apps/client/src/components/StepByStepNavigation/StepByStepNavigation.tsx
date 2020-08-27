import { themeColor } from "@datapunt/asc-ui";
import React from "react";

import { STEPBYSTEPNAVIGATION } from "../../utils/test-ids";
import usePassPropsToChildren from "../../utils/usePassPropsToChildren";
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
  // Pass the props defined below to all the children
  const { children } = usePassPropsToChildren(childrenProp, {
    customSize,
    disabledTextColor,
    doneTextColor,
    highlightActive,
  });

  // React Hook "usePassPropsToChildren" must be called before this `return` statement
  if (!childrenProp) {
    return null;
  }

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
