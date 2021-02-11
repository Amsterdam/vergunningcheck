import "leaflet/dist/leaflet.css";

import { BaseLayer, Zoom, constants } from "@amsterdam/arm-core";
import { DrawTool, ExtendedLayer } from "@amsterdam/arm-draw";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import L, { LatLngTuple } from "leaflet";
import React, { useEffect, useState } from "react";

import { CircleMarkerTreeInfo } from "../../__mocks__/treesListMocks";
import CirclesTrees from "./CirclesTrees";
import {
  DrawPanel,
  StyledDrawToolOpenButton,
  StyledMap,
  StyledParagraph,
  StyledResults,
  StyledViewerContainer,
  StyledZoomPanel,
} from "./MapStyles";
import { Overlay } from "./ResultsPanel";

const getTrees = loader("./getTrees.graphql");

const LocationMap = () => {
  const [currentOverlay, setCurrentOverlay] = useState<Overlay>(Overlay.None);
  const [showDrawTool, setShowDrawTool] = useState(Boolean);
  const [mapInstance, setMapInstance] = useState<L.Map>();
  const [error, setError] = useState<any>();
  const [coordinates, setCoordinates] = useState([[], [], [], []]);
  const [zoomLevel, setZoomLevel] = useState(10);
  const [mapLocation, setMapLocation] = useState<LatLngTuple>([
    52.3711013,
    4.8893335,
  ]);

  const [circleMarkersTreesList, setCircleMarkersTreesList] = useState<
    CircleMarkerTreeInfo[]
  >([]);
  const [zoomLevelMap, setZoomLevelMap] = useState(mapInstance?.getZoom());

  const setMarkerData = () => {
    const result = data?.trees?.map((tree: any) => {
      return {
        id: tree.id,
        title: tree.id,
        pinTreeId: false,
        isOpen: false,
        treesListCoordinates: tree.geometry.coordinates,
        detailsInfo: {
          treeId: tree.id,
          speciesName: "eik",
          treeType: "boom",
          height: "4m",
          recordYear: 1990,
          owner: "Gemeente Amsterdam",
          administrator: "deze",
        },
        isSelected: false,
      };
    });
    setCircleMarkersTreesList(result as any);
    setError(undefined);
  };

  const handleErrorMessage = () => {
    const errorMessage = graphqlError?.networkError as any;
    if (errorMessage?.result?.errors[0].message) {
      setError(errorMessage?.result?.errors[0].message);
    }
  };

  const { loading, error: graphqlError, data, refetch } = useQuery(getTrees, {
    skip: !mapInstance,
    onCompleted: setMarkerData,
    onError: handleErrorMessage,
    errorPolicy: "all",
    variables: !mapInstance
      ? undefined
      : {
          search: {
            type: "Polygon",
            coordinates: [coordinates],
          },
        },
  });

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

  const handleDrawTool = (drawToolState: boolean) => () => {
    setShowDrawTool(drawToolState);
  };

  const handleDrawEnd = async (layer: ExtendedLayer) => {
    console.log(layer);
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
        currentOverlay={currentOverlay}
        setCurrentOverlay={setCurrentOverlay}
        getSelectedTreesGroupCoordinates={selectCircleMarkerTree}
        circleMarkersTreesList={circleMarkersTreesList}
        expandAccordionItemTreeInfo={expandAccordionItemTreeInfo}
        deleteCircleMarkerTree={deleteCircleMarkerTree}
      />
      <StyledViewerContainer
        topLeft={error && <StyledParagraph>{error}</StyledParagraph>}
        topRight={
          !showDrawTool ? (
            <StyledDrawToolOpenButton onClick={handleDrawTool(true)} />
          ) : (
            <DrawPanel>
              <DrawTool
                onDrawEnd={handleDrawEnd}
                onClose={handleDrawTool(false)}
              />
            </DrawPanel>
          )
        }
        bottomRight={
          <StyledZoomPanel>
            <Zoom />
          </StyledZoomPanel>
        }
      />
      {zoomLevel > 10 && (
        <CirclesTrees
          zoomLevelMap={zoomLevelMap}
          setCurrentOverlay={setCurrentOverlay}
          circleMarkerTreesList={circleMarkersTreesList}
          selectCircleMarkerTree={selectCircleMarkerTree}
        />
      )}
      <BaseLayer />
    </StyledMap>
  );
};

export default LocationMap;
