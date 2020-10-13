import { themeSpacing } from "@amsterdam/asc-ui";
/* istanbul ignore file */
import styled from "styled-components";

export const HiddenDiv = styled.div`
  display: none;
  background: #eee;
  padding: ${themeSpacing(4)};
`;

export const Title = styled.p`
  font-weight: bold;
  font-size: ${themeSpacing(5)};
`;
