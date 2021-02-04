import { Checkmark } from "@amsterdam/asc-assets";
import React, {
  AnchorHTMLAttributes,
  FunctionComponent,
  HTMLAttributes,
  MouseEvent,
} from "react";
import { StyledProps } from "styled-components";

import { STEPBYSTEPITEM } from "../../utils/test-ids";
import StepByStepItemStyle, {
  BackgroundStyle,
  CircleStyle,
  CircleWrapperStyle,
  ContentWrapperStyle,
} from "./StepByStepItemStyle";
import StepByStepTitle from "./StepByStepTitle";

export type StepByStepItemProps = {
  active?: boolean;
  checked?: boolean;
  circleBackgroundColor?: string;
  clickable?: boolean;
  customSize?: boolean;
  disabled?: boolean;
  disabledTextColor?: string;
  done?: boolean;
  doneTextColor?: string;
  heading?: string;
  headingProps?: any;
  highlightActive?: boolean;
  largeCircle?: boolean;
  small?: boolean;
};

const StepByStepItem: FunctionComponent<
  StepByStepItemProps &
    AnchorHTMLAttributes<HTMLAnchorElement> &
    HTMLAttributes<HTMLDivElement> &
    StyledProps<any>
> = ({
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
  const handleOnClick = (event: MouseEvent<HTMLElement, MouseEvent>) => {
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
      aria-label={clickable ? heading : ""} // @TODO: Refactor with `??`
      as={clickable ? "a" : "div"}
      onClick={handleOnClick}
      role={clickable ? "menuitem" : ""} // @TODO: Refactor with `??`
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
