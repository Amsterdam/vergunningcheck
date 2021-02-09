import "leaflet/dist/leaflet.css";

import { CircleMarker, Marker } from "@amsterdam/react-maps";
import L, { LatLngTuple, PointTuple } from "leaflet";
import React from "react";
import { v4 as uuidv4 } from "uuid";

import { CircleMarkerTreeInfo } from "../../__mocks__/treesListMocks";
import CircleIcon from "../../static/media/circle-icon.png";
import { Overlay } from "./ResultsPanel";

const CirclesTrees = ({
  zoomLevelMap,
  circleMarkerTreesList,
  selectCircleMarkerTree,
  setCurrentOverlay,
}: {
  zoomLevelMap: number | undefined;
  circleMarkerTreesList: CircleMarkerTreeInfo[];
  selectCircleMarkerTree: Function;
  setCurrentOverlay: Function;
}) => {
  const setSizeSelectedCircle = (arg: any): PointTuple => {
    switch (arg) {
      case 16: {
        return [45, 45];
      }
      case 15: {
        return [25, 25];
      }
      case 14: {
        return [15, 15];
      }
      case 13: {
        return [5, 5];
      }
      default: {
        return [20, 20];
      }
    }
  };

  const SelectedRedCircleIcon = L.icon({
    iconUrl: CircleIcon,
    iconSize: setSizeSelectedCircle(zoomLevelMap),
  });

  const selectGreenCircle = (coords: LatLngTuple) => () => {
    selectCircleMarkerTree(coords);
  };

  const selectRedCircle = (coords: LatLngTuple) => () => {
    setCurrentOverlay(Overlay.Results);
    selectCircleMarkerTree(coords);
  };

  return (
    <>
      {circleMarkerTreesList &&
        circleMarkerTreesList.length > 0 &&
        circleMarkerTreesList.map((item: CircleMarkerTreeInfo) => {
          const { isSelected, treesListCoordinates } = item;

          if (isSelected) {
            return (
              <Marker
                key={uuidv4()}
                args={[treesListCoordinates]}
                options={{
                  icon: SelectedRedCircleIcon,
                }}
                events={{
                  click: selectGreenCircle(treesListCoordinates),
                }}
              />
            );
          }

          return (
            <CircleMarker
              key={uuidv4()}
              options={{
                stroke: isSelected,
                color: "red",
                radius: isSelected ? 1 : 0.5,
                fill: true,
                fillColor: isSelected ? "white" : "green",
                fillOpacity: 1,
              }}
              events={{
                click: selectRedCircle(treesListCoordinates),
              }}
              args={[treesListCoordinates]}
            />
          );
        })}
    </>
  );
};

export default CirclesTrees;
