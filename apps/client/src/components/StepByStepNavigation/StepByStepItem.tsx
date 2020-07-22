import { Checkmark } from "@datapunt/asc-assets";
import React from "react";

import { STEPBYSTEPITEM } from "../../utils/test-ids";
import StepByStepItemStyle, {
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
  if (!heading) return null;
  const clickable = !!(href || onClick);
  const as = clickable ? "a" : "div";
  // The currect item can never be `done` when it's `active`
  const done = (doneProp || checked) && !active;
  const handleOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onClick && onClick(e);
  };
  const hoverable = !children && !disabled && !active && clickable;
  const small = (customSize && !largeCircle) || (!customSize && !active);
  const unfinished = !done && !active;
  return (
    <StepByStepItemStyle
      {...{
        active,
        as,
        clickable,
        disabled,
        disabledTextColor,
        done,
        doneTextColor,
        heading,
        highlightActive,
        hoverable,
        href,
        unfinished,
      }}
      data-testid={STEPBYSTEPITEM}
      onClick={handleOnClick}
      tabIndex={clickable && !disabled && !active ? 0 : -1}
      {...otherProps}
    >
      <CircleWrapperStyle {...{ active, done }}>
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
