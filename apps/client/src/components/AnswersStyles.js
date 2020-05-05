import styled, { css } from "styled-components";

export const StyledAnswer = styled.div`
  ${(props) =>
    props.hasError &&
    css`
      color: red;
      border-left: 2px solid red;
      padding-left: 15px;
    `}
`;

export const StyledAnswerErrorText = styled.div`
  font-weight: 800;
  margin: 10px 0;
`;
