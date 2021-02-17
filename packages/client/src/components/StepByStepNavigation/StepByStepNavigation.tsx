import { themeColor } from "@amsterdam/asc-ui";
import React, { FunctionComponent, HTMLAttributes } from "react";

import passPropsToChildren from "../../utils/passPropsToChildren";
import { STEPBYSTEPNAVIGATION } from "../../utils/test-ids";
import StepByStepNavigationStyle from "./StepByStepNavigationStyle";

export type StepByStepNavigationProps = {
  customSize?: boolean;
  disabledTextColor?: any;
  doneTextColor?: any;
  highlightActive?: boolean;
  lineBetweenItems?: boolean;
};

const StepByStepNavigation: FunctionComponent<
  StepByStepNavigationProps & HTMLAttributes<HTMLElement>
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
} as StepByStepNavigationProps;

export default StepByStepNavigation;
