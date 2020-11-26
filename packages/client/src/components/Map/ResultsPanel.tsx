import {
  BaseLayer,
  MapPanel,
  MapPanelContent,
  MapPanelContext,
  MapPanelDrawer,
  MapPanelLegendButton,
  MapPanelProvider,
  Marker,
  Zoom,
  usePanToLatLng,
} from "@amsterdam/arm-core";
import { Paragraph, Spinner, ViewerContainer } from "@amsterdam/asc-ui";
import { useMatchMedia } from "@amsterdam/asc-ui/es/utils/hooks";
import { useMapInstance } from "@amsterdam/react-maps";
import { LatLng, LeafletMouseEvent } from "leaflet";
import React, { useContext, useEffect, useState } from "react";
import styled, { createGlobalStyle, css } from "styled-components";

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

const GlobalStyle = createGlobalStyle`
  body { 
    touch-action: none;
    overflow: hidden; // This will prevent the scrollBar on iOS due to navigation bar
  }
`;

const CustomMarker: React.FC<{
  setCurrentLatLng: (latLng: LatLng | null) => void;
  currentLatLng: LatLng | null;
}> = ({ setCurrentLatLng, currentLatLng }) => {
  const {
    drawerPosition,
    setPositionFromSnapPoint,
    matchPositionWithSnapPoint,
    variant,
  } = useContext(MapPanelContext);
  const mapInstance = useMapInstance();
  const { pan } = usePanToLatLng();

  useEffect(() => {
    const clickHandler = (e: LeafletMouseEvent) => {
      setPositionFromSnapPoint(SnapPoint.Halfway);
      setCurrentLatLng(e.latlng);
    };

    mapInstance.on("click", clickHandler);

    return () => {
      setCurrentLatLng(null);
      mapInstance.off("click", clickHandler);
    };
  }, [mapInstance, setCurrentLatLng, setPositionFromSnapPoint]);

  // Use this logic to automatically pan the map to the center of the marker when the drawer is positioned in the middle
  useEffect(() => {
    if (matchPositionWithSnapPoint(SnapPoint.Halfway) && currentLatLng) {
      pan(currentLatLng, variant === "drawer" ? "vertical" : "horizontal", 20);
    }
  }, [currentLatLng, drawerPosition, matchPositionWithSnapPoint, pan, variant]);
  return currentLatLng ? <Marker latLng={currentLatLng} /> : null;
};

const MapLegendContent = ({ ...otherProps }) => (
  <MapPanelContent {...otherProps}>test</MapPanelContent>
);

type ResultProps = {
  currentOverlay: Overlay;
  currentLatLng: LatLng | null;
  setCurrentOverlay: (overlay: Overlay) => void;
};

const Results: React.FC<ResultProps> = ({
  currentOverlay,
  currentLatLng,
  setCurrentOverlay,
}) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    // Fake loading time
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [currentLatLng]);
  return (
    <MapPanelContent
      title="Resultaten"
      animate
      stackOrder={currentOverlay === Overlay.Results ? 2 : 1}
      onClose={() => {
        setCurrentOverlay(Overlay.None);
      }}
    >
      {loading ? (
        <Spinner />
      ) : (
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi
          nobis odit reiciendis totam! Ad adipisci alias aliquid beatae commodi,
          consequatur cumque debitis delectus dolorem eius error fugit, harum
          hic iure labore laborum laudantium minima, neque non nulla quam
          quibusdam sapiente similique sit suscipit ut vel vero! Accusamus ad
          consequatur dolore esse, facere fugiat illum maxime mollitia nihil
          optio, quasi quisquam reprehenderit saepe sunt totam unde vel veniam
          veritatis vero voluptates.
        </Paragraph>
      )}
    </MapPanelContent>
  );
};

interface ResultsPanelProps {
  currentOverlay: Overlay;
  panelTitle?: string;
  panelSubTitle?: string;
  setCurrentOverlay: (overlay: Overlay) => void;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({
  currentOverlay,
  panelTitle,
  panelSubTitle,
  setCurrentOverlay,
}) => {
  const [currentLatLng, setCurrentLatLng] = useState<LatLng | null>(null);
  const [showDesktopVariant] = useMatchMedia({
    minBreakpoint: "tabletM",
  });
  const Element = showDesktopVariant ? MapPanel : MapPanelDrawer;
  return (
    <>
      <GlobalStyle />
      <MapPanelProvider
        variant={showDesktopVariant ? "panel" : "drawer"}
        initialPosition={SnapPoint.Closed}
      >
        <Element>
          <CustomMarker
            setCurrentLatLng={setCurrentLatLng}
            currentLatLng={currentLatLng}
          />
          {currentOverlay === Overlay.Legend && (
            <MapLegendContent
              title={panelTitle}
              subTitle={panelSubTitle}
              stackOrder={3}
              animate
              onClose={() => {
                setCurrentOverlay(Overlay.None);
              }}
            />
          )}
          {currentOverlay === Overlay.Results && (
            <Results
              {...{
                currentOverlay,
                setCurrentOverlay,
                currentLatLng,
              }}
            />
          )}
          <MapLegendContent title={panelTitle} subTitle={panelSubTitle} />
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
