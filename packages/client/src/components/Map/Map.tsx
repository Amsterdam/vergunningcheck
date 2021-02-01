import "leaflet/dist/leaflet.css";

import {
  MarkerClusterGroup,
  createClusterMarkers,
} from "@amsterdam/arm-cluster";
import {
  BaseLayer,
  Map,
  ViewerContainer,
  Zoom,
  constants,
} from "@amsterdam/arm-core";
import {
  DrawTool,
  DrawToolOpenButton,
  ExtendedLayer,
} from "@amsterdam/arm-draw";
import { Paragraph, themeColor, themeSpacing } from "@amsterdam/asc-ui";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import L, { LatLngTuple } from "leaflet";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import ResultsPanel, { Overlay } from "./ResultsPanel";

const getTrees = loader("./getTrees.graphql");

type TreeGeo = {
  geometry: {
    coordinates: LatLngTuple;
    type?: string;
  };
};
export type Tree = {
  id: string;
  geo: TreeGeo;
};

// const trees: Tree[] = [
//   {
//     id: "boom 1",
//     geo: {
//       geometry: {
//         coordinates: [52.3784493, 4.8471094],
//       },
//     },
//   },
//   {
//     id: "boom 2",
//     geo: {
//       geometry: {
//         coordinates: [52.381266, 4.8727906],
//       },
//     },
//   },
// ];

// const dots: Tree[] = [
//   {
//     id: "boom num 1",
//     geo: {
//       geometry: {
//         coordinates: [52.381329, 4.873074],
//       },
//     },
//   },
//   {
//     id: "boom num 2",
//     geo: {
//       geometry: {
//         coordinates: [52.381491, 4.873006],
//       },
//     },
//   },
//   {
//     id: "boom num 3",
//     geo: {
//       geometry: {
//         coordinates: [52.381406, 4.87305],
//       },
//     },
//   },
// ];

const StyledMap = styled(Map)`
  height: 600px;
  overflow: hidden;
`;

const StyledViewerContainer = styled(ViewerContainer)`
  z-index: 400;
  height: 640px;
  padding: 40px;
  margin-top: 40px;
`;
const StyledResults = styled(ResultsPanel)`
  z-index: 400;
  height: 600px;
  margin: 100px;
`;
const StyledZoom = styled(Zoom)`
  padding: 40px;
  margin: 100px;
`;
export const StyledParagraph = styled(Paragraph)`
  background-color: ${themeColor("support", "focus")};
  padding: 0 ${themeSpacing(4)};
`;

const LocationMap = () => {
  const [currentOverlay, setCurrentOverlay] = useState<Overlay>(Overlay.None);
  const [showDrawTool, setShowDrawTool] = useState(false);
  const [mapInstance, setMapInstance] = useState<L.Map>();
  const [zoomLevel, setZoomLevel] = useState(10);
  const [mapLocation, setMapLocation] = useState<LatLngTuple>([
    52.3711013,
    4.8893335,
  ]);
  const [coordinates, setCoordinates] = useState([[], [], [], []]);
  const [markers, setMarkers] = useState([]);
  const [currentTree, setCurrentTree] = useState<Tree | undefined>(undefined);

  const setMarkerData = () => {
    const result = data?.trees?.map((tree: any) => tree.geo.coordinates);
    setMarkers(result as any);
  };

  const { loading, error: graphqlError, data, refetch } = useQuery(getTrees, {
    skip: !mapInstance,
    onCompleted: setMarkerData,
    variables: !mapInstance
      ? undefined
      : {
          search: {
            type: "Polygon",
            coordinates: [coordinates],
          },
        },
  });

  console.error(graphqlError);
  useEffect(() => {
    function onChange() {
      setCoordinates([
        Object.values(
          mapInstance!.getBounds()?.getSouthWest()
        ).reverse() as any,
        Object.values(
          mapInstance!.getBounds()?.getSouthEast()
        ).reverse() as any,
        Object.values(
          mapInstance!.getBounds()?.getNorthEast()
        ).reverse() as any,
        Object.values(
          mapInstance!.getBounds()?.getNorthWest()
        ).reverse() as any,
      ]);
      console.log(mapInstance!.getCenter());
      setMapLocation(mapInstance!.getCenter() as any);
      setZoomLevel(mapInstance!.getZoom());
      console.log(zoomLevel);
      zoomLevel > 10 && !loading && refetch();
    }

    if (!loading) {
      mapInstance?.on("moveend", onChange);
      mapInstance?.on("dragend", onChange);
      mapInstance?.on("zoomend", onChange);
    }

    return () => {
      mapInstance?.off("moveend", onChange);
      mapInstance?.off("dragend", onChange);
      mapInstance?.off("zoomend", onChange);
    };
  }, [mapInstance, zoomLevel]);

  return (
    <StyledMap
      setInstance={setMapInstance}
      options={{
        ...constants.DEFAULT_AMSTERDAM_MAPS_OPTIONS,
        zoom: zoomLevel,
        center: mapLocation,
      }}
    >
      <StyledResults
        currentTree={currentTree}
        currentOverlay={currentOverlay}
        setCurrentOverlay={setCurrentOverlay}
        setCurrentTree={setCurrentTree}
      />
      <StyledViewerContainer
        bottomRight={<StyledZoom />}
        topLeft={
          zoomLevel < 11 && (
            <StyledParagraph>Zoom in om de bomen te zien.</StyledParagraph>
          )
        }
        topRight={
          !showDrawTool ? (
            <DrawToolOpenButton onClick={() => setShowDrawTool(true)} />
          ) : (
            <DrawTool
              onDrawEnd={async (layer: ExtendedLayer) => {
                console.log(layer);
              }}
              onClose={() => {
                setShowDrawTool(false);
              }}
            />
          )
        }
      />
      <MarkerClusterGroup
        optionsOverrides={{
          spiderfyOnMaxZoom: false,
          showCoverageOnHover: false,
          zoomToBoundsOnClick: true,
          maxClusterRadius: 50,
          chunkedLoading: true,
          disableClusteringAtZoom: 16,
        }}
        markers={createClusterMarkers({
          markers: zoomLevel > 10 ? markers : [],
          events: {
            click: (e: any) => {
              console.log(e);
              setCurrentTree(e.latlng);
              setCurrentOverlay(Overlay.Results);

              // setCurrentTree(currentTree);
            },
          },
        })}
      />
      <BaseLayer />
    </StyledMap>
  );
};

export default LocationMap;
