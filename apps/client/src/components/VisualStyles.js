import styled, { css } from "styled-components";
import { perceivedLoading } from "@datapunt/asc-ui";

export const FigCaption = styled.figcaption`
  font-style: italic;
`;

export const Figure = styled.figure`
  min-height: 1px; /* IE11 Bug */
  margin: 0 0 24px 0;
  ${({ isLoading, theme, animateLoading }) =>
    isLoading &&
    css`
      ${perceivedLoading(animateLoading)}
      height: 100px;
      width: 100%;
      & > * {
        display: none;
      }
      &::before {
        content: "";
        display: block;
        width: calc(100% - 30px);
        height: 30px;
        ${perceivedLoading(animateLoading)({ theme })}
      }
    `}
`;

export const Img = styled.img`
  max-width: 100%;
  border: 1px solid #aaa;
`;
