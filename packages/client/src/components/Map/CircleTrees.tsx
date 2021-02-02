import "leaflet/dist/leaflet.css";

import { CircleMarker } from "@amsterdam/react-maps";
import React from "react";
import { v4 as uuidv4 } from "uuid";

import { dotsTree } from "../../__mocks__/treesListMocks";

const CirclesTrees = ({
  currentTreesGroupsDotsList,
  getSelectedTreesGroupCoordinates,
}: {
  currentTreesGroupsDotsList: dotsTree[] | undefined | false;
  getSelectedTreesGroupCoordinates: Function;
}) => {
  const selectTree = (event: any) => {
    getSelectedTreesGroupCoordinates([event.latlng.lat, event.latlng.lng]);
  };
  return (
    <>
      {currentTreesGroupsDotsList &&
        currentTreesGroupsDotsList.length > 0 &&
        currentTreesGroupsDotsList.map((item) => {
          const { isSelected, treesListCoordinates } = item;
          return (
            <CircleMarker
              key={uuidv4()}
              options={{
                stroke: false,
                radius: 0.5,
                fill: true,
                fillColor: isSelected ? "red" : "green",
                fillOpacity: 1,
              }}
              events={{
                click: selectTree,
              }}
              args={[treesListCoordinates]}
            />
          );
        })}
    </>
  );
};

export default CirclesTrees;
