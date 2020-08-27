import { themeColor } from "@datapunt/asc-ui";
import React from "react";

import { STEPBYSTEPNAVIGATION } from "../../utils/test-ids";
import usePassPropsToChildren from "../../utils/usePassPropsToChildren";
import StepByStepNavigationStyle, { Props } from "./StepByStepNavigationStyle";

const StepByStepNavigation: React.FC<
  Props & React.HTMLAttributes<HTMLElement>
> = ({
  children: childrenProps,
  customSize,
  disabledTextColor,
  doneTextColor,
  highlightActive,
  ...otherProps
}) => {
  const { children } = usePassPropsToChildren(childrenProps, {
    customSize,
    disabledTextColor,
    doneTextColor,
    highlightActive,
  });

  if (!childrenProps) {
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
