import { MapPanel, MapPanelDrawer } from "@amsterdam/arm-core";
import { ChevronDown, ChevronUp } from "@amsterdam/asc-assets";
import { ViewerContainer } from "@amsterdam/asc-ui";
import styled from "styled-components";

import { StyledMapPanelDrawerProps } from "./ResultsPanel";

export const ArrowUp = styled(ChevronUp)`
  height: 28px;

  @media (max-width: 575px) {
    height: 20px;
  }
`;

export const ArrowDown = styled(ChevronDown)`
  height: 28px;

  @media (max-width: 575px) {
    height: 20px;
  }
`;

export const StylerViewerContainer = styled(ViewerContainer)`
  z-index: 400;
`;

export const StyledMapPanel = styled(MapPanel)`
  height: 600px;

  overflow: visible;
  border: 2px solid #cbcbc7;

  top: 40px;
  z-index: 401;

  .Handle-sc-1x3qvqu {
    width: 30px;
    height: 60px;

    background-color: #fff;
    border: 2px solid #cbcbc7;
    border-left: 0;

    position: absolute;
    top: 40px;
    left: 100%;
  }

  .StyledContainer-sc-6t6po7.eNtynH {
    width: 0;
  }

  .StyledContainer-sc-6t6po7.eNtynH .Content-sc-16cxgps {
    width: 0;
    padding: 0;
  }

  .StyledContainer-sc-6t6po7.eNtynH .Header-sc-i2hdjm {
    display: none;
  }
`;

export const StyledMapPanelDrawer = styled(MapPanelDrawer)<
  StyledMapPanelDrawerProps
>`
  .MapPanelDrawerStyle-sc-1yh7g19 {
    border: 2px solid #cbcbc7;
    border-bottom: 0;
  }

  @media (max-width: 1100px) {
    .MapPanelDrawerStyle-sc-1yh7g19 .Handle-sc-qxxy2a {
      display: none;
    }

    .MapPanelDrawerStyle-sc-1yh7g19 {
      height: 300px;

      top: ${({ isHide }) =>
        isHide ? "9999px !important" : "306px !important"};
    }

    .Header-sc-i2hdjm {
      padding: 8px 16px;
    }

    .sc-crrsfI {
      font-size: 20px;
    }
  }

  @media (max-width: 767px) {
    .StyledContainer-sc-6t6po7 {
      height: 300px;

      top: 0;
    }

    .Content-sc-16cxgps {
      padding-bottom: 8px;
    }
  }

  @media (max-width: 575px) {
    .MapPanelDrawerContentWrapper-sc-1ms1gsc {
      height: 300px;
    }

    .MapPanelDrawerStyle-sc-1yh7g19 {
      top: ${({ isHide }) =>
        isHide ? "9999px !important" : "314px !important"};
    }
  }
`;

export const ButtonSlideDrawer = styled.button`
  display: none;
  width: 100%;

  background-color: #fff;
  border: 2px solid #cbcbc7;
  border-top: 0;

  position: absolute;
  bottom: 0;
  z-index: 2000;

  @media (max-width: 1100px) {
    display: block;
  }
`;
