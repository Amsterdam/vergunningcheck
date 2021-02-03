import "leaflet/dist/leaflet.css";

import { CircleMarker, Marker } from "@amsterdam/react-maps";
import L, { LatLngTuple, PointTuple } from "leaflet";
import React from "react";
import { v4 as uuidv4 } from "uuid";

import { CircleMarkerTreeInfo } from "../../__mocks__/treesListMocks";
import CircleIcon from "./circle-icon.png";

const CirclesTrees = ({
  zoomLevelMap,
  circleMarkerTreesList,
  selectCircleMarkerTree,
}: {
  zoomLevelMap: number | undefined;
  circleMarkerTreesList: CircleMarkerTreeInfo[];
  selectCircleMarkerTree: Function;
}) => {
  const setSizeSelectedCircle = (arg: any): PointTuple => {
    switch (arg) {
      case 16: {
        return [45, 45];
      }
      case 15: {
        return [40, 40];
      }
      case 14: {
        return [35, 35];
      }
      case 13: {
        return [30, 30];
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

  const selectTree = (coords: LatLngTuple) => () =>
    selectCircleMarkerTree(coords);

  console.log("circleMarkerTreesList", circleMarkerTreesList);
  return (
    <>
      {circleMarkerTreesList &&
        circleMarkerTreesList.length > 0 &&
        circleMarkerTreesList.map((item) => {
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
                  click: selectTree(treesListCoordinates),
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
                click: selectTree(treesListCoordinates),
              }}
              args={[treesListCoordinates]}
            />
          );
        })}
    </>
  );
};

export default CirclesTrees;
