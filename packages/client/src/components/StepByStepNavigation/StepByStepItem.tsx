import { Checkmark } from "@amsterdam/asc-assets";
import React from "react";

import { STEPBYSTEPITEM } from "../../utils/test-ids";
import StepByStepItemStyle, {
  BackgroundStyle,
  CircleStyle,
  CircleWrapperStyle,
  ContentWrapperStyle,
  Props,
} from "./StepByStepItemStyle";
import StepByStepTitle from "./StepByStepTitle";

const StepByStepItem: React.FC<Props & React.HTMLAttributes<HTMLElement>> = ({
  active,
  checked,
  children,
  circleBackgroundColor,
  customSize,
  disabled,
  disabledTextColor,
  done: doneProp,
  doneTextColor,
  heading,
  headingProps,
  highlightActive,
  href,
  largeCircle,
  onClick,
  ...otherProps
}) => {
  if (!heading) {
    return null;
  }

  const clickable = !!(href || onClick);

  // The `checked` item is `done`, but the `active` item is not `done`
  const done = (doneProp || checked) && !active;

  // All "inactive" items are `small` by default, except when `customSize` has been set
  const small = (!customSize && !active) || (customSize && !largeCircle);

  // @TODO: also enable the ENTER key to act as onClick
  const handleOnClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    onClick && onClick(event);
  };

  return (
    <StepByStepItemStyle
      {...{
        active,
        clickable,
        disabled,
        disabledTextColor,
        done,
        doneTextColor,
        heading,
        highlightActive,
        href,
      }}
      data-testid={STEPBYSTEPITEM}
      aria-label={clickable ? heading : ""}
      as={clickable ? "a" : "div"}
      onClick={handleOnClick}
      role={clickable ? "menuitem" : ""}
      tabIndex={clickable && !disabled && !active ? 0 : -1}
      {...otherProps}
    >
      {active && highlightActive && <BackgroundStyle />}
      <CircleWrapperStyle {...{ done }}>
        <CircleStyle
          size={13}
          {...{ active, checked, circleBackgroundColor, done, small }}
        >
          {checked && <Checkmark />}
        </CircleStyle>
      </CircleWrapperStyle>
      <ContentWrapperStyle>
        <StepByStepTitle
          {...{ children, customSize, heading, headingProps, small }}
        />
        {children}
      </ContentWrapperStyle>
    </StepByStepItemStyle>
  );
};

export default StepByStepItem;
