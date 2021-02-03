import { LatLngTuple } from "leaflet";

export type Tree = {
  id: string;
  geometry: {
    coordinates: LatLngTuple[];
    type?: string;
  };
  treesListCoordinates: LatLngTuple[];
  selectedTreesListCoordinates?: LatLngTuple[];
};

export type CircleMarkerTree = {
  selected: boolean;
  coords: LatLngTuple;
};
