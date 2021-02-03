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

import { AccordionList } from "../../atoms";
import { Tree } from "./__mocks__/pinsTreesListMocks";
import { tree } from "./__mocks__/treeListMocks";

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

type ResultProps = {
  currentTree: Tree | null;
  currentOverlay: Overlay;
  setCurrentTree: any; // xxx
  setCurrentOverlay: (overlay: Overlay) => void;
  dotsTreesList: tree[];
  updateTreesList: Function;
  deleteTree: Function;
  handleVisibilityPinTrees: (bool: Boolean) => void;
};

const Results: React.FC<ResultProps> = ({
  currentTree,
  setCurrentTree,
  setCurrentOverlay,
  dotsTreesList,
  updateTreesList,
  deleteTree,
  handleVisibilityPinTrees,
}) => {
  const [loading, setLoading] = useState(false);
  const [isOpenTreesList, setOpenTreesList] = useState(false);

  const expandAccordionWithDetailInfo = (id: string) => () => {
    updateTreesList(id);
  };

  const cutDownTree = () => {
    setOpenTreesList(true);
    handleVisibilityPinTrees(false);
    // getTreesGroupCoordinates(currentTree);
  };

  const closeMapPanelContent = () => {
    setCurrentTree(null);
    setCurrentOverlay(Overlay.None);
    // getTreesGroupCoordinates({});
    handleVisibilityPinTrees(true);
  };

  useEffect(() => {
    setLoading(true);
    // Fake loading time
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, [currentTree]);

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
          {currentTree && (
            <>
              <Paragraph gutterBottom={0}>
                Boom geselecteerd: {currentTree?.id}
              </Paragraph>
              <Paragraph>
                Boom coordinaten:{" "}
                {JSON.stringify(currentTree?.geometry?.coordinates)}
              </Paragraph>
              <Button onClick={cutDownTree} variant="primary">
                Ik wil deze boom kappen
              </Button>
              {isOpenTreesList && (
                <AccordionList
                  treesList={dotsTreesList}
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
  currentTree: Tree | undefined;
  currentOverlay: Overlay;
  setCurrentOverlay: (overlay: Overlay) => void;
  setCurrentTree: any; // xxx
  treesList: tree[];
  updateTreesList: Function;
  deleteTree: Function;
  handleVisibilityPinTrees: void;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({
  currentTree,
  currentOverlay,
  setCurrentOverlay,
  setCurrentTree,
  treesList,
  updateTreesList,
  deleteTree,
  handleVisibilityPinTrees,
}) => {
  const [showDesktopVariant] = useMatchMedia({
    minBreakpoint: "tabletM",
  });

  if (!currentTree) {
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
              currentTree,
              currentOverlay,
              setCurrentTree,
              setCurrentOverlay,
              treesList,
              updateTreesList,
              deleteTree,
              handleVisibilityPinTrees,
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
