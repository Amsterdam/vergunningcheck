import {
  MapPanel,
  MapPanelContent,
  MapPanelDrawer,
  MapPanelProvider,
} from "@amsterdam/arm-core";
import { Spinner, ViewerContainer } from "@amsterdam/asc-ui";
import { useMatchMedia } from "@amsterdam/asc-ui/lib/utils/hooks";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Tree } from "../../__mocks__/pinsTreesListMocks";
import { CircleMarkerTreeInfo } from "../../__mocks__/treesListMocks";
import { AccordionList } from "../../atoms";

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

const StylerViewerContainer = styled(ViewerContainer)`
  z-index: 400;
  // height: 400px;
`;
const StyledMapPanel = styled(MapPanel)`
  z-index: 401;
  top: 88px;
  height: 600px;
`;

type Props = {
  currentOverlay: Overlay;
  setCurrentOverlay: (overlay: Overlay) => void;
  showDesktopVariant: boolean;
};

const ViewerContainerWithMapDrawerOffset: React.FC<Props> = ({
  ...otherProps
}) => {
  return <StylerViewerContainer {...otherProps} />;
};

type ResultProps = {
  currentPinMarkerTreesGroup: Tree | null;
  currentOverlay: Overlay;
  setCurrentPinMarkerTreesGroup: any; // xxx
  setCurrentOverlay: (overlay: Overlay) => void;
  zoomToCircleMarkerTreesGroup: Function;
  getSelectedTreesGroupCoordinates: Function;
  circleMarkersTreesList: CircleMarkerTreeInfo[];
  expandAccordionItemTreeInfo: Function;
  deleteCircleMarkerTree: Function;
};

const Results: React.FC<ResultProps> = ({
  currentPinMarkerTreesGroup,
  setCurrentPinMarkerTreesGroup,
  setCurrentOverlay,
  zoomToCircleMarkerTreesGroup,
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

  const closeMapPanelContent = () => {
    setCurrentPinMarkerTreesGroup(null);
    setCurrentOverlay(Overlay.None);
    zoomToCircleMarkerTreesGroup({});
  };

  useEffect(() => {
    setLoading(true);
    // Fake loading time
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, [currentPinMarkerTreesGroup]);

  return (
    <MapPanelContent
      title="Kies een boom"
      animate
      variant={"drawer"}
      onClose={closeMapPanelContent}
    >
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
  currentPinMarkerTreesGroup: Tree | undefined;
  currentOverlay: Overlay;
  setCurrentOverlay: (overlay: Overlay) => void;
  setCurrentPinMarkerTreesGroup: any; // xxx
  zoomToCircleMarkerTreesGroup: Function;
  getSelectedTreesGroupCoordinates: Function;
  circleMarkersTreesList: CircleMarkerTreeInfo[];
  expandAccordionItemTreeInfo: Function;
  deleteCircleMarkerTree: Function;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({
  currentPinMarkerTreesGroup,
  currentOverlay,
  setCurrentOverlay,
  setCurrentPinMarkerTreesGroup,
  zoomToCircleMarkerTreesGroup,
  getSelectedTreesGroupCoordinates,
  circleMarkersTreesList,
  expandAccordionItemTreeInfo,
  deleteCircleMarkerTree,
}) => {
  const [showDesktopVariant] = useMatchMedia({
    minBreakpoint: "tabletM",
  });

  if (!currentPinMarkerTreesGroup) {
    return null;
  }

  const Element = showDesktopVariant ? StyledMapPanel : MapPanelDrawer;
  return (
    <div>
      <MapPanelProvider
        variant={showDesktopVariant ? "panel" : "drawer"}
        initialPosition={SnapPoint.Full}
      >
        <Element>
          <Results
            {...{
              currentPinMarkerTreesGroup,
              currentOverlay,
              setCurrentPinMarkerTreesGroup,
              setCurrentOverlay,
              zoomToCircleMarkerTreesGroup,
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
            showDesktopVariant,
          }}
        />
      </MapPanelProvider>
    </div>
  );
};

export default ResultsPanel;
