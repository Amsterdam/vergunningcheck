import { LatLngTuple } from "leaflet";
import { v4 as uuidv4 } from "uuid";

export type tree = {
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
  geometry: {
    coordinates: LatLngTuple;
  };
};

export default [
  {
    id: uuidv4(),
    title: "Boom nummer 1",
    pinTreeId: "boom 1",
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
    geometry: {
      coordinates: [52.3706736230273, 4.90402531512053],
    },
  },
  {
    id: uuidv4(),
    title: "Boom nummer 2",
    pinTreeId: "boom 1",
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
    geometry: {
      coordinates: [52.3701168980927, 4.90397039814735],
    },
  },
  {
    id: uuidv4(),
    title: "Boom nummer 3",
    pinTreeId: "boom 1",
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
    geometry: {
      coordinates: [52.3707669432068, 4.90550562949144],
    },
  },
  {
    id: uuidv4(),
    title: "Boom nummer 4",
    pinTreeId: "boom 1",
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
    geometry: {
      coordinates: [52.370438514487, 4.90428768918262],
    },
  },
  {
    id: uuidv4(),
    title: "Boom nummer 5",
    pinTreeId: "boom 1",
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
    geometry: {
      coordinates: [52.3702637443156, 4.9043153028201],
    },
  },
  {
    id: uuidv4(),
    title: "Boom nummer 6",
    pinTreeId: "boom 1",
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
    geometry: {
      coordinates: [52.3705954604083, 4.90411206637859],
    },
  },
  {
    id: uuidv4(),
    title: "Boom nummer 7",
    pinTreeId: "boom 1",
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
    geometry: {
      coordinates: [52.3704747170414, 4.90481245762887],
    },
  },
  {
    id: uuidv4(),
    title: "Boom nummer 8",
    pinTreeId: "boom 1",
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
    geometry: {
      coordinates: [52.370695240745, 4.90533369756735],
    },
  },
  {
    id: uuidv4(),
    title: "Boom nummer 9",
    pinTreeId: "boom 1",
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
    geometry: {
      coordinates: [52.3705161377, 4.90420087099772],
    },
  },
  {
    id: uuidv4(),
    title: "Boom nummer 10",
    pinTreeId: "boom 1",
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
    geometry: {
      coordinates: [52.3705906393038, 4.90352556220802],
    },
  },
  {
    id: uuidv4(),
    title: "Boom nummer 11",
    pinTreeId: "boom 2",
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
    geometry: {
      coordinates: [52.3703942559505, 4.90462200433021],
    },
  },
  {
    id: uuidv4(),
    title: "Boom nummer 12",
    pinTreeId: "boom 2",
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
    geometry: {
      coordinates: [52.370819506211, 4.90562123704666],
    },
  },
  {
    id: uuidv4(),
    title: "Boom nummer 13",
    pinTreeId: "boom 2",
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
    geometry: {
      coordinates: [52.3703697951395, 4.90436498323601],
    },
  },
  {
    id: uuidv4(),
    title: "Boom nummer 14",
    pinTreeId: "boom 2",
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
    geometry: {
      coordinates: [52.3703697951395, 4.90436498323601],
    },
  },
  {
    id: uuidv4(),
    title: "Boom nummer 15",
    pinTreeId: "boom 2",
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
    geometry: {
      coordinates: [52.3707573580705, 4.90393859095072],
    },
  },
  {
    id: uuidv4(),
    title: "Boom nummer 16",
    pinTreeId: "boom 2",
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
    geometry: {
      coordinates: [52.3706987106787, 4.90378603404174],
    },
  },
  {
    id: uuidv4(),
    title: "Boom nummer 17",
    pinTreeId: "boom 2",
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
    geometry: {
      coordinates: [52.3700488668313, 4.90380885652741],
    },
  },
  {
    id: uuidv4(),
    title: "Boom nummer 18",
    pinTreeId: "boom 2",
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
    geometry: {
      coordinates: [52.3706333381144, 4.90518469851331],
    },
  },
  {
    id: uuidv4(),
    title: "Boom nummer 19",
    pinTreeId: "boom 2",
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
    geometry: {
      coordinates: [52.3701933737181, 4.90414421190167],
    },
  },
  {
    id: uuidv4(),
    title: "Boom nummer 20",
    pinTreeId: "boom 2",
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
    geometry: {
      coordinates: [52.3706476509254, 4.90366042762065],
    },
  },
];
