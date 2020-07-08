import { themeSpacing } from "@datapunt/asc-ui";
import styled from "styled-components";

export const Illustration = styled.img`
  max-width: 300px;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const Pair = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: ${themeSpacing(6)};
`;
