import { LatLngTuple } from "leaflet";

type TreeGeo = {
  geometry: {
    coordinates: LatLngTuple;
    type?: string;
  };
  treesListCoordinates: LatLngTuple[];
  selectedTreesListCoordinates?: LatLngTuple[];
};

export type Tree = {
  id: string;
  geo: TreeGeo;
};

export type CircleMarkerTree = {
  selected: boolean;
  coords: LatLngTuple;
};

export const trees: Tree[] = [
  {
    id: "boom 1",
    geo: {
      geometry: {
        coordinates: [52.3784493, 4.8471094],
      },
      treesListCoordinates: [
        [52.378158, 4.84652],
        [52.378102, 4.84615],
        [52.377933, 4.846711],
        [52.377866, 4.846322],
        [52.377997, 4.845759],
        [52.377742, 4.845783],
        [52.377684, 4.845524],
        [52.377859, 4.845406],
        [52.377896, 4.84508],
        [52.377675, 4.845014],
      ],
      selectedTreesListCoordinates: [],
    },
  },
  {
    id: "boom 2",
    geo: {
      geometry: {
        coordinates: [52.381266, 4.8727906],
      },
      treesListCoordinates: [
        [52.38102, 4.87336],
        [52.38108, 4.873339],
        [52.381141, 4.873264],
        [52.381139, 4.873189],
        [52.381226, 4.873103],
        [52.380963, 4.873472],
        [52.381187, 4.872907],
        [52.381084, 4.873506],
        [52.381073, 4.873482],
        [52.381035, 4.873471],
      ],
      selectedTreesListCoordinates: [],
    },
  },
];
