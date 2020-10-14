/* istanbul ignore file */
import { themeSpacing } from "@amsterdam/asc-ui";
import styled from "styled-components";

export const HiddenDiv = styled.div`
  display: none;
  background: #eee;
`;

export const Title = styled.p`
  font-weight: bold;
  font-size: ${themeSpacing(5)};
`;
