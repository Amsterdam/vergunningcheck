import { LatLngTuple } from "leaflet";

export type Tree = {
  id: string;
  geometry: {
    coordinates: any;
    type?: string;
  };
  treesListCoordinates: any;
  selectedTreesListCoordinates?: any;
};

export type CircleMarkerTree = {
  selected: boolean;
  coords: LatLngTuple;
};
