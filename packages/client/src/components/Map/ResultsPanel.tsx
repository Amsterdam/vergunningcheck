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
      onClose={() => {
        setCurrentTree(null);
        setCurrentOverlay(Overlay.None);
      }}
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
                {JSON.stringify(currentTree?.geo?.geometry?.coordinates)}
              </Paragraph>
              <Button onClick={() => console.log("asdsad")} variant="primary">
                Ik wil deze boom kappen
              </Button>
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
