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

import { Tree } from "./__mocks__/pinsTreesListMocks";
import treesListMocks, { tree } from "./__mocks__/treeListMocks";
import ResultsPanel, { Overlay } from "./ResultsPanel";

const getTrees = loader("./getTrees.graphql");

const StyledMap = styled(Map)`
  height: 600px;
  overflow: hidden;
  width: 1500px;
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
const StyledZoom = styled(Zoom)`s
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
  const [treesList, settreesList] = useState<tree[]>([]);
  const [isDisplayedPinTrees, setDisplayedPinTrees] = useState(true);

  const setMarkerData = () => {
    const result = data?.trees?.map((tree: any) => tree.geometry.coordinates);
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

  const getSelectedTreesGroupCoordinates = (coordinates: LatLngTuple) => {
    const updatedtreesList = treesList.map((item) => {
      if (
        item.treesListCoordinates[0] === coordinates[0] &&
        item.treesListCoordinates[1] === coordinates[1]
      ) {
        return { ...item, isSelected: !item.isSelected };
      }
      return item;
    });
    settreesList(updatedtreesList);
  };

  const getTreesGroupCoordinates = (coordinates: Tree) => {
    if (Object.keys(coordinates).length > 0) {
      mapInstance?.fitBounds(coordinates.geometry.treesListCoordinates);
    }
  };

  const updatetreesList = (id: string) => {
    const updatedtreesList = treesList.map((item) => {
      if (id === item.id) {
        return { ...item, isOpen: !item.isOpen };
      }
      return item;
    });
    settreesList(updatedtreesList);
  };

  const deleteDotTree = ({
    dotsList,
    id,
  }: {
    dotsList: tree[];
    id: string;
  }) => {
    const updatedTreesList = dotsList.filter((item) => item.id !== id);
    settreesList(updatedTreesList);
  };

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
        getTreesGroupCoordinates={getTreesGroupCoordinates}
        getSelectedTreesGroupCoordinates={getSelectedTreesGroupCoordinates}
        treesList={treesList}
        updatetreesList={updatetreesList}
        deleteDotTree={deleteDotTree}
        handleVisibilityPinTrees={setDisplayedPinTrees(true)}
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

              const currentTree = trees.find((tree) => {
                const { coordinates } = tree.geo.geometry;
                return (
                  coordinates[0] === e.latlng.lat &&
                  coordinates[1] === e.latlng.lng
                );
              });

              const currenttreesList: any =
                currentTree &&
                Object.keys(currentTree).length > 0 &&
                treesListMocks.filter(
                  (tree) => tree.pinTreeId === currentTree.id
                );

              settreesList(currenttreesList);
              setCurrentTree(currentTree);
            },
          },
        })}
      />
      {!isDisplayedPinTrees && (
        <CirclesTrees
          currentTreesGroupsDotsList={treesList}
          getSelectedTreesGroupCoordinates={getSelectedTreesGroupCoordinates}
        />
      )}
      <BaseLayer />
    </StyledMap>
  );
};

export default LocationMap;
