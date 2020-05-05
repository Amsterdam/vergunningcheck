import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 7px 0 7px;
  justify-content: space-between;
  border-top: 1px solid black;
`;

export const MainWrapper = styled(Wrapper)`
  font-weight: 700;
`;

export const Question = styled.div`
  width: 60%;
`;

export const UserAnswer = styled.div`
  width: 100px;
`;

export const UserResult = styled.div`
  display: flex;
  font-weight: bold;
  /* TODO: Should we enable this? */
  /* flex-direction: row; */
`;

export const Change = styled.div`
  width: 60px;
`;
