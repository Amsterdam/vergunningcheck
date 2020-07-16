import { Icon, breakpoint, themeColor, themeSpacing } from "@datapunt/asc-ui";
import styled, { css } from "styled-components";

import { focusOutlineStyle } from "../../../utils/themeUtils";

type NestedProps = {
  active?: boolean;
  checked?: boolean;
  circleBackgroundColor?: string;
  clickable?: boolean;
  disabled?: boolean;
  disabledTextColor?: string;
  done?: boolean;
  doneTextColor?: string;
  highlightActive?: boolean;
  hoverable?: boolean;
  largeCircle?: boolean;
  small?: boolean;
  unfinished?: boolean;
};

export type Props = {
  customSize?: boolean;
  heading: string;
  headingProps?: any;
  href?: string;
  onClick?: Function;
} & NestedProps;

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

export default styled.div<Props>`
  position: relative;
  display: flex;
  height: 100%;
  padding-top: ${themeSpacing(4)};
  padding-bottom: ${themeSpacing(5)};
  text-decoration: none;
  cursor: initial;

  ${({ active, highlightActive }) =>
    active &&
    highlightActive &&
    css`
      background-color: ${themeColor("tint", "level2")};
    `}
  ${({ clickable }) =>
    clickable &&
    css`
      ${focusOutlineStyle}
      cursor: pointer;
    `}
  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `}
  ${({ hoverable }) =>
    hoverable &&
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
  ${({ unfinished, disabledTextColor }) =>
    unfinished &&
    css`
      * {
        color: ${disabledTextColor};
      }
    `}
`;

const CircleWrapperStyle = styled.div<NestedProps>`
  position: relative;
  display: flex;
  width: ${circleSize.mobile.large};
  flex: 0 0 ${circleSize.mobile.large};
  margin-right: ${themeSpacing(2)};
  justify-content: center;
  z-index: 1;
  /* background-color: rgba(67%, 86.6%, 34.8%, 0.25); */

  @media ${breakpoint("min-width", "tabletM")} {
    width: 60px;
    margin-right: 0;
    flex: 0 0 60px;
  }

  &:after {
    content: "";
    position: absolute;
    display: block;
    width: 2px;
    height: calc(100% + ${themeSpacing(9)});
    top: ${themeSpacing(3)};
    left: calc(50% - 1px);
    background-color: ${({ active, done }) =>
      active || done
        ? themeColor("primary", "main")
        : themeColor("tint", "level4")};
  }
`;

const CircleStyle = styled(Icon)<NestedProps>`
  position: relative;
  width: ${circleSize.mobile.large};
  height: ${circleSize.mobile.large};
  align-items: center;
  background-color: ${themeColor("tint", "level4")};
  border-radius: 50%;
  justify-content: center;
  transition: background-color 0.2s ease-in-out;
  z-index: 1;
  /* opacity: 0.2; */

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

const ContentWrapperStyle = styled.div<NestedProps>`
  display: flex;
  max-width: 620px;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  /* background-color: rgba(68.3%, 10.1%, 64.9%, 0.5); */
`;

export { CircleStyle, ContentWrapperStyle, CircleWrapperStyle };
