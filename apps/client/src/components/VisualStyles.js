import styled, { css } from "styled-components";
import { perceivedLoading, themeColor, themeSpacing } from "@datapunt/asc-ui";

export const FigCaption = styled.figcaption`
  font-style: italic;
`;

export const Figure = styled.figure`
  margin: 0 0 ${themeSpacing(6)} 0;
  padding: 0;
  line-height: 0;
  ${(props) =>
    !props.loaded &&
    css`
      ${perceivedLoading()}
      height: 0;
      padding-bottom: 75%; /* All our images are 4x3 aspect ratio, we need to fix this if this changes */
    `}
  ${(props) =>
    props.loaded &&
    css`
      min-height: 1px; /* IE11 Bug: fixes height problem */
    `}
`;

export const Img = styled.img`
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
  border: 1px solid transparent;
  /* Adding the border after succesful loading to fix a floating line */
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
