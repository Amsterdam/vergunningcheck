import { Icon, breakpoint, themeColor, themeSpacing } from "@amsterdam/asc-ui";
import styled, { css } from "styled-components";

import { StepByStepItemProps } from "./StepByStepItem";

const circleSize = {
  desktop: {
    large: "30px",
    small: "20px",
  },
  mobile: {
    large: "24px",
    small: "18px",
  },
};

export default styled.div<StepByStepItemProps>`
  position: relative;
  display: flex;
  height: 100%;
  padding: ${themeSpacing(4, 4, 4, 0)};
  text-decoration: none;
  cursor: initial;

  ${({ active, clickable }) =>
    // Disable native browser focus on non-clickable elements
    (active || !clickable) &&
    css`
      &:focus {
        outline: none;
      }
    `}
  ${({ clickable }) =>
    clickable &&
    css`
      cursor: pointer;
    `}
  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `}
  ${({ active, children, clickable, disabled }) =>
    // Conditions to be hoverable
    !active &&
    !children &&
    !disabled &&
    clickable &&
    css`
      &:hover {
        text-decoration: underline;
      }
    `}
  ${({ active, done, doneTextColor }) =>
    (active || done) &&
    css`
      color: ${doneTextColor};
    `}
  ${({ active, disabledTextColor, done }) =>
    !active &&
    !done &&
    css`
      * {
        color: ${disabledTextColor};
      }
    `}
  ${({ activeStyle }) =>
    // This overwrites the `lineBetweenItems`
    activeStyle &&
    css`
      &&& {
        margin-top: -1px;
        border-color: transparent;
      }
    `}
`;

const CircleWrapperStyle = styled.div<StepByStepItemProps>`
  position: relative;
  display: flex;
  width: ${circleSize.mobile.large};
  flex: 0 0 ${circleSize.mobile.large};
  margin-right: ${themeSpacing(2)};
  justify-content: center;
  z-index: 1;

  @media ${breakpoint("min-width", "tabletM")} {
    width: 60px;
    margin-right: 0;
    flex: 0 0 60px;
  }

  /* Force print the background colors on webkit browsers */
  @media print {
    -webkit-print-color-adjust: exact;
  }

  /* This is styling for the in vertical line on the left side */
  &:after {
    content: "";
    position: absolute;
    display: block;
    width: 2px;
    height: calc(100% + ${themeSpacing(9)});
    top: ${themeSpacing(3)};
    left: calc(50% - 1px);
    background-color: ${({ done }) =>
      done ? themeColor("primary", "main") : themeColor("tint", "level4")};
  }
`;

const CircleStyle = styled(Icon)<StepByStepItemProps>`
  position: relative;
  width: ${circleSize.mobile.large};
  height: ${circleSize.mobile.large};
  align-items: center;
  background-color: ${themeColor("tint", "level4")};
  border-radius: 50%;
  justify-content: center;
  z-index: 1;

  @media ${breakpoint("min-width", "tabletM")} {
    width: ${circleSize.desktop.large};
    height: ${circleSize.desktop.large};
  }

  ${({ small }) =>
    small &&
    css`
      width: ${circleSize.mobile.small};
      height: ${circleSize.mobile.small};

      @media ${breakpoint("min-width", "tabletM")} {
        width: ${circleSize.desktop.small};
        height: ${circleSize.desktop.small};
      }
    `}
  ${({ active, done }) =>
    (active || done) &&
    css`
      background-color: ${themeColor("primary", "main")};
    `}
  ${({ checked }) =>
    checked &&
    css`
      fill: ${themeColor("tint", "level1")};
    `}
  ${({ circleBackgroundColor }) =>
    circleBackgroundColor &&
    css`
      background-color: ${circleBackgroundColor};
    `}
`;

const ContentWrapperStyle = styled.div<StepByStepItemProps>`
  position: relative;
  display: flex;
  max-width: 620px;
  width: 100%;
  flex-direction: column;
  justify-content: center;
`;

const BackgroundStyle = styled.div<StepByStepItemProps>`
  position: absolute;
  height: 100%;
  width: 300vw;
  top: 0;
  left: -100vw;
  right: 100vw;
  background-color: ${themeColor("tint", "level2")};
  pointer-events: none;
`;

export {
  BackgroundStyle,
  CircleStyle,
  CircleWrapperStyle,
  ContentWrapperStyle,
};
