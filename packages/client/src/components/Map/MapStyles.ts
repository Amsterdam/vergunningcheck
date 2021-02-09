import "leaflet/dist/leaflet.css";

import { Map, ViewerContainer } from "@amsterdam/arm-core";
import { DrawToolOpenButton } from "@amsterdam/arm-draw";
import { Paragraph, themeColor, themeSpacing } from "@amsterdam/asc-ui";
import styled from "styled-components";

import ResultsPanel from "./ResultsPanel";

export const StyledMap = styled(Map)`
  height: 600px;
  overflow: hidden;
`;

export const StyledViewerContainer = styled(ViewerContainer)`
  z-index: 400;
  height: 600px;
  margin-top: 40px;

  @media (min-width: 575px) {
    .DrawToolButton-sc-19aoyp8 {
      color: red;
    }
  }
`;

export const StyledResults = styled(ResultsPanel)`
  z-index: 400;
  height: 600px;
  margin: 100px;
`;

export const StyledDrawToolOpenButton = styled(DrawToolOpenButton)`
  @media (max-width: 575px) {
    width: 30px;
    height: 30px;

    & span {
      width: 30px;
    }
  }
`;

export const DrawPanel = styled.div`
  @media (max-width: 575px) {
    button {
      width: 30px;
      height: 30px;
    }

    svg {
      width: 20px;
      margin: 0 auto;
    }
  }
`;

export const StyledZoomPanel = styled.div`
  margin-bottom: 24px;

  @media (max-width: 575px) {
    button {
      width: 30px;
      height: 30px;
    }

    svg {
      width: 15px;
      margin: 0 auto;
    }
  }
`;

export const StyledParagraph = styled(Paragraph)`
  background-color: ${themeColor("support", "focus")};
  padding: 0 ${themeSpacing(4)};
`;
