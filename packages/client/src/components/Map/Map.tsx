import "leaflet/dist/leaflet.css";

import {
  MarkerClusterGroup,
  createClusterMarkers,
} from "@amsterdam/arm-cluster";
import { BaseLayer, Map, ViewerContainer, Zoom } from "@amsterdam/arm-core";
import { LatLngTuple } from "leaflet";
import React, { useState } from "react";
import styled from "styled-components";

import ResultsPanel, { Overlay } from "./ResultsPanel";

// XXX
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

const trees: Tree[] = [
  {
    id: "boom 1",
    geo: {
      geometry: {
        coordinates: [52.3784493, 4.8471094],
      },
    },
  },
  {
    id: "boom 2",
    geo: {
      geometry: {
        coordinates: [52.381266, 4.8727906],
      },
    },
  },
];

// Create markers from trees mock
const markers = trees.map((tree) => tree.geo.geometry.coordinates);

const StyledMap = styled(Map)`
  height: 600px;
`;

const LocationMap = () => {
  const [currentOverlay, setCurrentOverlay] = useState<Overlay>(Overlay.None);
  const [currentTree, setCurrentTree] = useState<Tree | undefined>(undefined);

  return (
    <StyledMap fullScreen>
      <ResultsPanel
        currentTree={currentTree}
        currentOverlay={currentOverlay}
        setCurrentOverlay={setCurrentOverlay}
        setCurrentTree={setCurrentTree}
      />
      <ViewerContainer bottomRight={<Zoom />} />
      <MarkerClusterGroup
        markers={createClusterMarkers({
          markers,
          events: {
            click: (e: any) => {
              setCurrentTree(e.latlng);
              setCurrentOverlay(Overlay.Results);

              const currentTree = trees.find((tree) => {
                const { coordinates } = tree.geo.geometry;
                return (
                  coordinates[0] === e.latlng.lat &&
                  coordinates[1] === e.latlng.lng
                );
              });
              setCurrentTree(currentTree);
            },
          },
        })}
      />
      <BaseLayer />
    </StyledMap>
  );
};

export default LocationMap;
