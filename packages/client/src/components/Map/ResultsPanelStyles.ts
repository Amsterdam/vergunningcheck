import { MapPanel, MapPanelDrawer } from "@amsterdam/arm-core";
import { ChevronDown, ChevronUp } from "@amsterdam/asc-assets";
import { ViewerContainer } from "@amsterdam/asc-ui";
import styled from "styled-components";

type StyledMapPanelDrawerProps = {
  isHide?: boolean;
};

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

export const StyledMapPanel = styled(MapPanel)<StyledMapPanelDrawerProps>`
  height: 550px;

  top: 90px;
  z-index: 401;

  @media (max-width: 1100px) {
    width: 400px !important;
  }

  @media (max-width: 990px) {
    width: 370px !important;
  }
`;

export const StyledMapPanelDrawer = styled(
  MapPanelDrawer
)<StyledMapPanelDrawerProps>`
  @media (max-width: 880px) {
    .MapPanelDrawerStyle-sc-1yh7g19 button {
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
  border: 0;

  position: absolute;
  bottom: 0;
  z-index: 2000;

  @media (max-width: 880px) {
    display: block;
  }
`;
