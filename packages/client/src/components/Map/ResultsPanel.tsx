import {
  BaseLayer,
  MapPanel,
  MapPanelContent,
  MapPanelContext,
  MapPanelDrawer,
  MapPanelLegendButton,
  MapPanelProvider,
  Zoom,
} from "@amsterdam/arm-core";
import { Paragraph, Spinner, ViewerContainer } from "@amsterdam/asc-ui";
import { useMatchMedia } from "@amsterdam/asc-ui/lib/utils/hooks";
import React, { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";

import { Tree } from "./Map";

type StyledViewerContainerProps = {
  leftOffset?: string;
  viewerHeight?: string;
  ignoreTransition: boolean;
};

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

const StyledViewerContainer = styled(ViewerContainer).attrs<
  StyledViewerContainerProps
>(({ viewerHeight, leftOffset }) => ({
  style: {
    height: viewerHeight,
    left: leftOffset,
  },
}))<StyledViewerContainerProps>`
  z-index: 400;
  ${({ ignoreTransition }) =>
    !ignoreTransition &&
    css`
      transition: height 0.3s ease-in-out;
    `}
`;

type Props = {
  currentOverlay: Overlay;
  setCurrentOverlay: (overlay: Overlay) => void;
  showDesktopVariant: boolean;
};

const ViewerContainerWithMapDrawerOffset: React.FC<Props> = ({
  currentOverlay,
  setCurrentOverlay,
  showDesktopVariant,
  ...otherProps
}) => {
  const { drawerPosition, draggable } = useContext(MapPanelContext);
  const height =
    parseInt(drawerPosition, 10) < window.innerHeight / 2
      ? "50%"
      : drawerPosition;

  return (
    <>
      {!showDesktopVariant ? (
        <StyledViewerContainer
          {...otherProps}
          ignoreTransition={draggable}
          viewerHeight={height}
          bottomLeft={
            <MapPanelLegendButton
              showDesktopVariant={showDesktopVariant}
              currentOverlay={currentOverlay}
              setCurrentOverlay={setCurrentOverlay}
            />
          }
        />
      ) : (
        <StyledViewerContainer
          {...otherProps}
          ignoreTransition={draggable}
          leftOffset={drawerPosition}
          topLeft={
            <MapPanelLegendButton
              showDesktopVariant={showDesktopVariant}
              currentOverlay={currentOverlay}
              setCurrentOverlay={setCurrentOverlay}
            />
          }
          bottomRight={<Zoom />}
        />
      )}
    </>
  );
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
  currentOverlay,
  setCurrentTree,
  setCurrentOverlay,
}) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    // Fake loading time
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [currentTree]);

  return (
    <MapPanelContent
      title="Resultaten"
      animate
      stackOrder={currentOverlay === Overlay.Results ? 2 : 1}
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
            </>
          )}
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi
            nobis odit reiciendis totam! Ad adipisci alias aliquid beatae
            commodi, consequatur cumque debitis delectus dolorem eius error
            fugit, harum hic iure labore laborum laudantium minima, neque non
            nulla quam quibusdam sapiente similique sit suscipit ut vel vero!
            Accusamus ad consequatur dolore esse, facere fugiat illum maxime
            mollitia nihil optio, quasi quisquam reprehenderit saepe sunt totam
            unde vel veniam veritatis vero voluptates.
          </Paragraph>
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

  const Element = showDesktopVariant ? MapPanel : MapPanelDrawer;
  return (
    <>
      {/* <GlobalStyle /> */}
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
      <BaseLayer />
    </>
  );
};

export default ResultsPanel;
