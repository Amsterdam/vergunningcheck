import {
  MapPanel,
  MapPanelContent,
  MapPanelDrawer,
  MapPanelProvider,
} from "@amsterdam/arm-core";
import { Button, Paragraph, Spinner, ViewerContainer } from "@amsterdam/asc-ui";
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
  height: 400px;
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
  // const height =
  //   parseInt(drawerPosition, 10) < window.innerHeight / 2
  //     ? "50%"
  //     : drawerPosition;

  return <StylerViewerContainer {...otherProps} />;
};

// @Sven: This disabled scrolling on desktop, should this only be enabled on tablet / mobile?
// const GlobalStyle = createGlobalStyle`
//   body {
//     touch-action: none;
//     overflow: hidden; // This will prevent the scrollBar on iOS due to navigation bar
//   }
// `;

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
  const [isOpenTreesList, setOpenTreesList] = useState(false);

  const expandAccordionWithDetailInfo = (id: string) => () => {
    expandAccordionItemTreeInfo(id);
  };

  const deleteTree = (id: string) => (event: any) => {
    event.stopPropagation();
    deleteCircleMarkerTree({ treesList: circleMarkersTreesList, id });
  };

  const cutDownTree = () => {
    setOpenTreesList(true);
    zoomToCircleMarkerTreesGroup(currentPinMarkerTreesGroup);
  };

  const closeMapPanelContent = () => {
    setCurrentPinMarkerTreesGroup(null);
    setCurrentOverlay(Overlay.None);
    zoomToCircleMarkerTreesGroup({});
    setOpenTreesList(false);
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
      subTitle="U kunt meer dan 1 keuze maken"
      animate
      variant={"drawer"}
      onClose={closeMapPanelContent}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {currentPinMarkerTreesGroup && (
            <>
              <Paragraph gutterBottom={0}>
                Boom geselecteerd: {currentPinMarkerTreesGroup?.id}
              </Paragraph>
              <Paragraph>
                Boom coordinaten:{" "}
                {JSON.stringify(
                  currentPinMarkerTreesGroup?.geo?.geometry?.coordinates
                )}
              </Paragraph>
              {!isOpenTreesList && (
                <Button onClick={cutDownTree} variant="primary">
                  Ik wil deze boom kappen
                </Button>
              )}
              {isOpenTreesList && (
                <AccordionList
                  treesList={circleMarkersTreesList}
                  deleteTree={deleteTree}
                  expandAccordionWithDetailInfo={expandAccordionWithDetailInfo}
                />
              )}
            </>
          )}
        </>
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
