import { MapPanelContent, MapPanelProvider } from "@amsterdam/arm-core";
import { Spinner } from "@amsterdam/asc-ui";
import { useMatchMedia } from "@amsterdam/asc-ui/lib/utils/hooks";
import React, { useEffect, useState } from "react";
import { StyledComponent } from "styled-components";

import { CircleMarkerTreeInfo } from "../../__mocks__/treesListMocks";
import { AccordionList } from "../../atoms";
import {
  ArrowDown,
  ArrowUp,
  ButtonSlideDrawer,
  StyledMapPanel,
  StyledMapPanelDrawer,
  StylerViewerContainer,
} from "./ResultsPanelStyles";

export type StyledMapPanelDrawerProps = {
  isHide?: boolean;
};

type RegularStyledComponent = StyledComponent<React.FC<{}>, any>;

type AdvancedStyledComponent = StyledComponent<
  React.FC<{}>,
  any,
  StyledMapPanelDrawerProps
>;

export enum Overlay {
  Results,
  Legend,
  None,
}

export enum SnapPoint {
  Full,
  Halfway,
  Closed,
}

type Props = {
  currentOverlay: Overlay;
  setCurrentOverlay: (overlay: Overlay) => void;
  showMobileVariant: boolean;
};

const ViewerContainerWithMapDrawerOffset: React.FC<Props> = ({
  ...otherProps
}) => {
  return <StylerViewerContainer {...otherProps} />;
};

type ResultProps = {
  currentOverlay: Overlay;
  setCurrentOverlay: (overlay: Overlay) => void;
  getSelectedTreesGroupCoordinates: Function;
  circleMarkersTreesList: CircleMarkerTreeInfo[];
  expandAccordionItemTreeInfo: Function;
  deleteCircleMarkerTree: Function;
};

const Results: React.FC<ResultProps> = ({
  setCurrentOverlay,
  circleMarkersTreesList,
  expandAccordionItemTreeInfo,
  deleteCircleMarkerTree,
}) => {
  const [loading, setLoading] = useState(false);

  const expandAccordionWithDetailInfo = (id: string) => () => {
    expandAccordionItemTreeInfo(id);
  };

  const deleteTree = (id: string) => (event: any) => {
    event.stopPropagation();
    deleteCircleMarkerTree({ treesList: circleMarkersTreesList, id });
  };

  useEffect(() => {
    setLoading(true);
    // Fake loading time
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, []);

  return (
    <MapPanelContent title="Kies een boom" animate variant={"drawer"}>
      {loading ? (
        <Spinner />
      ) : (
        <AccordionList
          treesList={circleMarkersTreesList}
          deleteTree={deleteTree}
          expandAccordionWithDetailInfo={expandAccordionWithDetailInfo}
        />
      )}
    </MapPanelContent>
  );
};

interface ResultsPanelProps {
  currentOverlay: Overlay;
  setCurrentOverlay: (overlay: Overlay) => void;
  getSelectedTreesGroupCoordinates: Function;
  circleMarkersTreesList: CircleMarkerTreeInfo[];
  expandAccordionItemTreeInfo: Function;
  deleteCircleMarkerTree: Function;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({
  currentOverlay,
  setCurrentOverlay,
  getSelectedTreesGroupCoordinates,
  circleMarkersTreesList,
  expandAccordionItemTreeInfo,
  deleteCircleMarkerTree,
}) => {
  const [isHideDrawer, setHideDrawer] = useState(false);

  const [showMobileVariant] = useMatchMedia({
    query: "(max-width: 1100px)",
  });

  const slideOutDrawer = () => setHideDrawer(!isHideDrawer);

  if (currentOverlay !== 0) {
    return null;
  }

  const Element:
    | RegularStyledComponent
    | AdvancedStyledComponent = showMobileVariant
    ? StyledMapPanelDrawer
    : StyledMapPanel;

  return (
    <MapPanelProvider
      variant={showMobileVariant ? "drawer" : "panel"}
      initialPosition={SnapPoint.Full}
    >
      <ButtonSlideDrawer onClick={slideOutDrawer}>
        {isHideDrawer ? <ArrowDown /> : <ArrowUp />}
      </ButtonSlideDrawer>
      <Element isHide={isHideDrawer}>
        <Results
          {...{
            currentOverlay,
            setCurrentOverlay,
            getSelectedTreesGroupCoordinates,
            circleMarkersTreesList,
            expandAccordionItemTreeInfo,
            deleteCircleMarkerTree,
          }}
        />
      </Element>
      <ViewerContainerWithMapDrawerOffset
        {...{
          setCurrentOverlay,
          currentOverlay,
          showMobileVariant,
        }}
      />
    </MapPanelProvider>
  );
};

export default ResultsPanel;
