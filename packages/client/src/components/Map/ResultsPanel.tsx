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

import { AccordionList } from "../../atoms";
import treesListMocks from "./__mocks__/treeListMocks";
import { Tree } from "./Map";

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
  currentTree: Tree | null;
  currentOverlay: Overlay;
  setCurrentTree: any; // xxx
  setCurrentOverlay: (overlay: Overlay) => void;
};

const Results: React.FC<ResultProps> = ({
  currentTree,
  setCurrentTree,
  setCurrentOverlay,
}) => {
  const [loading, setLoading] = useState(false);
  const [treesList, setTreesList] = useState([...treesListMocks]);

  const updateTreesList = (id: string) => () => {
    const updatedTreesList = treesList.map((item) => {
      if (id === item.id) {
        return { ...item, isOpen: !item.isOpen };
      }
      return item;
    });
    setTreesList(updatedTreesList);
  };

  const deleteTree = (id: string) => (event: any) => {
    event.stopPropagation();
    const updatedTreesList = treesList.filter((item) => item.id !== id);
    setTreesList(updatedTreesList);
  };

  const closeMapPanelContent = () => {
    setCurrentTree(null);
    setCurrentOverlay(Overlay.None);
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
      animate
      variant={"drawer"}
      onClose={closeMapPanelContent}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {currentTree && (
            <AccordionList
              treesList={treesList}
              updateTreesList={updateTreesList}
              deleteTree={deleteTree}
            />
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
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({
  currentTree,
  currentOverlay,
  setCurrentOverlay,
  setCurrentTree,
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
