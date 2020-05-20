import styled from "styled-components";
import { Card } from "@datapunt/asc-ui";

export const FigCaption = styled.figcaption`
  font-style: italic;
`;

export const StyledCard = styled(Card)`
  min-height: 100px; /* IE11 Bug */
  margin: 0 0 24px 0;
`;

export const Img = styled.img`
  max-width: 100%;
  border: 1px solid #aaa;
`;
