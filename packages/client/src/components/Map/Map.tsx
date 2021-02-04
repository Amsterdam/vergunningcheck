import "leaflet/dist/leaflet.css";

// import {
//   MarkerClusterGroup,
//   createClusterMarkers,
// } from "@amsterdam/arm-cluster";
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

import { Tree } from "../../__mocks__/pinsTreesListMocks";
import treesListMocks, {
  CircleMarkerTreeInfo,
} from "../../__mocks__/treesListMocks";
import CirclesTrees from "./CirclesTrees";
import ResultsPanel, { Overlay } from "./ResultsPanel";

const getTrees = loader("./getTrees.graphql");

const StyledMap = styled(Map)`
  height: 600px;
  overflow: hidden;
`;

const StyledViewerContainer = styled(ViewerContainer)`
  z-index: 400;
  height: 640px;
  margin-top: 40px;
`;
const StyledResults = styled(ResultsPanel)`
  z-index: 400;
  height: 600px;
  margin: 100px;
`;
export const StyledParagraph = styled(Paragraph)`
  background-color: ${themeColor("support", "focus")};
  padding: 0 ${themeSpacing(4)};
`;

const LocationMap = () => {
  const [currentOverlay, setCurrentOverlay] = useState<Overlay>(Overlay.None);
  const [showDrawTool, setShowDrawTool] = useState(Boolean);
  const [mapInstance, setMapInstance] = useState<L.Map>();
  const [coordinates, setCoordinates] = useState([[], [], [], []]);
  const [zoomLevel, setZoomLevel] = useState(10);
  const [mapLocation, setMapLocation] = useState<LatLngTuple>([
    52.3711013,
    4.8893335,
  ]);

  console.log("currentOverlay", currentOverlay);
  const [currentPinMarkerTreesGroup, setCurrentPinMarkerTreesGroup] = useState<
    Tree
  >();
  const [circleMarkersTreesList, setCircleMarkersTreesList] = useState<
    CircleMarkerTreeInfo[]
  >([]);
  const [zoomLevelMap, setZoomLevelMap] = useState(mapInstance?.getZoom());

  const setMarkerData = () => {
    const result = data?.trees?.map((tree: any) => tree.geometry.coordinates);
    setCircleMarkersTreesList(result as any);

    console.log(currentPinMarkerTreesGroup);
    console.log("call this");
    console.log("circleMarkersTreesList", circleMarkersTreesList);
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

  console.log(graphqlError);
  console.log("data", data);
  console.log("treesListMocks", treesListMocks);

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
      setMapLocation(mapInstance!.getCenter() as any);
      setZoomLevel(mapInstance!.getZoom());
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
  }, [loading, mapInstance, refetch, zoomLevel]);

  // const updateTreesList = (id: string) => {
  //   const updatedtreesList = treesList.map((item) => {
  //     if (id === item.id) {
  //       return { ...item, isOpen: !item.isOpen };
  //     }
  //     return item;
  //   });
  //   settreesList(updatedtreesList);
  // };

  const selectCircleMarkerTree = (coordinates: LatLngTuple) => {
    const updatedDotsTreesList = circleMarkersTreesList.map((item) => {
      if (
        item.treesListCoordinates[0] === coordinates[0] &&
        item.treesListCoordinates[1] === coordinates[1]
      ) {
        return { ...item, isSelected: !item.isSelected };
      }
      return item;
    });

    setCircleMarkersTreesList(updatedDotsTreesList);
  };

  const zoomToCircleMarkerTreesGroup = (coordinates: Tree) => {
    if (Object.keys(coordinates).length > 0) {
      mapInstance?.fitBounds(coordinates.geo.treesListCoordinates);
    }
  };

  const handleDrawTool = (drawToolState: boolean) => () => {
    setShowDrawTool(drawToolState);
  };

  const expandAccordionItemTreeInfo = (id: string) => {
    const updatedDotsTreesList = circleMarkersTreesList.map((item) => {
      if (id === item.id) {
        return { ...item, isOpen: !item.isOpen };
      }
      return item;
    });
    setCircleMarkersTreesList(updatedDotsTreesList);
  };

  const deleteCircleMarkerTree = ({
    treesList,
    id,
  }: {
    treesList: CircleMarkerTreeInfo[];
    id: string;
  }) => {
    const updatedTreesList = treesList.filter((item) => item.id !== id);
    setCircleMarkersTreesList(updatedTreesList);
  };

  // const zoomLevel = mapInstance?.getZoom();

  console.log("current Overlay", currentOverlay);

  return (
    <StyledMap
      fullScreen
      setInstance={setMapInstance}
      options={{
        ...constants.DEFAULT_AMSTERDAM_MAPS_OPTIONS,
        zoom: zoomLevel,
        center: mapLocation,
      }}
      events={{
        zoomend: () => setZoomLevelMap(mapInstance?.getZoom()),
      }}
    >
      <StyledResults
        currentPinMarkerTreesGroup={currentPinMarkerTreesGroup}
        currentOverlay={Overlay.Results}
        setCurrentOverlay={setCurrentOverlay}
        setCurrentPinMarkerTreesGroup={setCurrentPinMarkerTreesGroup}
        zoomToCircleMarkerTreesGroup={zoomToCircleMarkerTreesGroup}
        getSelectedTreesGroupCoordinates={selectCircleMarkerTree}
        circleMarkersTreesList={circleMarkersTreesList}
        expandAccordionItemTreeInfo={expandAccordionItemTreeInfo}
        deleteCircleMarkerTree={deleteCircleMarkerTree}
      />
      <StyledViewerContainer
        topLeft={
          zoomLevel &&
          zoomLevel < 11 && (
            <StyledParagraph>Zoom in om de bomen te zien.</StyledParagraph>
          )
        }
        topRight={
          !showDrawTool ? (
            <DrawToolOpenButton onClick={handleDrawTool(true)} />
          ) : (
            <DrawTool
              onDrawEnd={async (layer: ExtendedLayer) => {
                console.log(layer);
              }}
              onClose={handleDrawTool(false)}
            />
          )
        }
        bottomRight={<Zoom />}
      />
      {/*<MarkerClusterGroup*/}
      {/*  optionsOverrides={{*/}
      {/*    spiderfyOnMaxZoom: false,*/}
      {/*    showCoverageOnHover: false,*/}
      {/*    zoomToBoundsOnClick: true,*/}
      {/*    maxClusterRadius: 50,*/}
      {/*    chunkedLoading: true,*/}
      {/*    disableClusteringAtZoom: 16,*/}
      {/*  }}*/}
      {/*  markers={createClusterMarkers({*/}
      {/*    markers: [],*/}
      {/*    events: {*/}
      {/*      click: (e: any) => {*/}
      {/*        setCurrentPinMarkerTreesGroup(e.latlng);*/}
      {/*        setCurrentOverlay(Overlay.Results);*/}

      {/*        const currentPinMarkerTreesGroup = trees.find((tree) => {*/}
      {/*          const { coordinates } = tree.geo.geometry;*/}
      {/*          return (*/}
      {/*            coordinates[0] === e.latlng.lat &&*/}
      {/*            coordinates[1] === e.latlng.lng*/}
      {/*          );*/}
      {/*        });*/}

      {/*        const currentDotsTreesList: any =*/}
      {/*          currentPinMarkerTreesGroup &&*/}
      {/*          Object.keys(currentPinMarkerTreesGroup).length > 0 &&*/}
      {/*          treesListMocks.filter(*/}
      {/*            (tree) => tree.pinTreeId === currentPinMarkerTreesGroup.id*/}
      {/*          );*/}

      {/*        setCircleMarkersTreesList(currentDotsTreesList);*/}
      {/*        setCurrentPinMarkerTreesGroup(currentPinMarkerTreesGroup);*/}
      {/*      },*/}
      {/*    },*/}
      {/*  })}*/}
      {/*/>*/}
      {zoomLevel > 10 && (
        <CirclesTrees
          zoomLevelMap={zoomLevelMap}
          setCurrentOverlay={setCurrentOverlay}
          circleMarkerTreesList={treesListMocks} // if no graphql data use mock data.
          selectCircleMarkerTree={selectCircleMarkerTree}
        />
      )}
      <BaseLayer />
    </StyledMap>
  );
};

export default LocationMap;
