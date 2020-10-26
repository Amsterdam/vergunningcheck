import {
  Paragraph,
  breakpoint,
  perceivedLoading,
  themeColor,
  themeSpacing,
} from "@amsterdam/asc-ui";
import styled, { css } from "styled-components";

type DefaultProps = {
  errored?: boolean;
  loaded?: boolean;
};

export const Caption = styled(Paragraph)`
  margin: ${themeSpacing(2)} 0 0 0;
  font-style: italic;
`;

export const Figure = styled.figure<DefaultProps>`
  display: inline-block;
  width: 100%;
  margin: 0 ${themeSpacing(6)} ${themeSpacing(6)} 0;
  padding: 0;
  line-height: 0;
  vertical-align: top;

  @media ${breakpoint("min-width", "tabletS")} {
    width: calc(50% - ${themeSpacing(3)});

    /* Make sure the second Figure (even) is placed on the right side */
    &:nth-of-type(even) {
      margin-right: 0;
    }
  }
  ${(props) =>
    !props.loaded &&
    css`
      ${perceivedLoading()}
      height: 0;

      /* All our images are 4x3 aspect ratio, we need to fix this if this changes */
      padding-bottom: 75%;
      @media ${breakpoint("min-width", "tabletS")} {
        padding-bottom: 37.5%;
      }
    `}
  ${(props) =>
    props.loaded &&
    css`
      /* IE11 Bug: fixes height problem */
      min-height: 1px;
    `}
`;

export const Img = styled.img<DefaultProps>`
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
  /* Adding the border after succesful loading to fix a floating line */
  border: 1px solid transparent;
  transform: border 0.15s;

  ${(props) =>
    props.loaded &&
    css`
      border: 1px solid ${themeColor("tint", "level5")};
    `}
  ${(props) =>
    props.errored &&
    css`
      min-width: 100%;
      padding: 33px;
      text-align: center;
      line-height: 17px;
    `}
`;
