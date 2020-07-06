import { Icon, breakpoint, themeColor, themeSpacing } from "@datapunt/asc-ui";
import styled, { css } from "styled-components";

type NestedProps = {
  disableFadeEffect?: boolean;
  done?: boolean;
  active?: boolean;
  checked?: boolean;
  circleBackground?: string;
  small?: boolean;
  titleProps?: any;
};

export type Props = {
  customCircleSizes?: boolean;
  title: string;
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
  display: flex;
  height: 100%;
  padding-top: ${themeSpacing(4)};
  padding-bottom: ${themeSpacing(5)};
  /* background-color: rgba(57.3%, 100%, 57.3%, 0.5); */
`;

const CircleWrapperStyle = styled.div<NestedProps>`
  position: relative;
  display: flex;
  width: ${circleSize.mobile.large};
  flex: 0 0 ${circleSize.mobile.large};
  margin-right: ${themeSpacing(2)};
  /* background-color: rgba(67%, 86.6%, 34.8%, 0.5); */
  justify-content: center;

  @media ${breakpoint("min-width", "tabletM")} {
    width: 60px;
    margin-right: 0;
    flex: 0 0 60px;
  }

  &:after {
    content: "";
    position: absolute;
    display: block;
    left: calc(50% - 1px);
    top: ${themeSpacing(4)};
    width: 2px;
    height: calc(100% + ${themeSpacing(9)});
    background-color: ${({ done }) =>
      done ? themeColor("primary", "main") : themeColor("tint", "level4")};
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
  ${({ circleBackground }) =>
    circleBackground &&
    css`
      background-color: ${circleBackground};
    `}
`;

const ContentWrapperStyle = styled.div<NestedProps>`
  /* background-color: rgba(68.3%, 10.1%, 64.9%, 0.5); */

  ${({ disableFadeEffect, done }) =>
    !disableFadeEffect &&
    done &&
    // These hardcoded tags need to be transformed to ParagraphStyle and HeadingStyle in `asc-ui`
    css`
      p,
      h3 {
        color: ${themeColor("tint", "level4")};
      }
    `}
`;

export { CircleStyle, ContentWrapperStyle, CircleWrapperStyle };
