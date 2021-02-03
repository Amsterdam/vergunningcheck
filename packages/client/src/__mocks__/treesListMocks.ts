import { LatLngTuple } from "leaflet";
import { v4 as uuidv4 } from "uuid";

export type CircleMarkerTreeInfo = {
  id: string;
  title: string;
  pinTreeId: string;
  isOpen: boolean;
  isSelected: boolean;
  detailsInfo: {
    treeId: string;
    speciesName: string;
    treeType: string;
    height: string;
    recordYear: number;
    owner: string;
    administrator: string;
  };
  treesListCoordinates: LatLngTuple;
};

const coordinatesTreesList = [
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
  [52.381187, 4.872907],
  [52.381226, 4.873103],
  [52.381139, 4.873189],
  [52.381141, 4.873264],
  [52.38108, 4.873339],
  [52.38102, 4.87336],
  [52.380963, 4.873472],
  [52.381035, 4.873471],
  [52.381073, 4.873482],
  [52.381084, 4.873506],
];

export default coordinatesTreesList.map((item, index) => {
  return {
    id: uuidv4(),
    title: `Boom nummer ${index + 1}`,
    pinTreeId: index <= 9 ? "boom 1" : "boom 2",
    isOpen: false,
    isSelected: false,
    detailsInfo: {
      treeId: "344594",
      speciesName: "Ulmus hollandica",
      treeType: "Boom vrij uitgroeiend",
      height: "12 tot 15m.",
      recordYear: 1950,
      owner: "Gemeente Amsterdam",
      administrator: "Stadsdeel Centrum",
    },
    treesListCoordinates: item,
  };
});
