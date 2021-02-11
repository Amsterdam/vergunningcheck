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

const trees = coordinatesTreesList.map((item, index) => {
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

export const graphTreeMock = {
  request: {
    query: "searchTrees",
    variables: {},
  },
  result: {
    data: {
      data: {
        trees: [
          {
            id:
              "G0363.002591fcc2b84e87aa742ae8955704f6~20051223175647~20160503164617",
            geometry: {
              coordinates: [52.3706736230273, 4.90402531512053],
            },
          },
          {
            id:
              "G0363.0f4606afae694fc7a872f96a83c6e8e8~20051223175637~20160503164617",
            geometry: {
              coordinates: [52.3701168980927, 4.90397039814735],
            },
          },
          {
            id:
              "G0363.2822a91bbdd840e48086103228f55f08~20051223175652~20160503164617",
            geometry: {
              coordinates: [52.3707669432068, 4.90550562949144],
            },
          },
          {
            id:
              "G0363.33744e2c56124a0caa5b7dfe3fc80bda~20051223175629~20160503164617",
            geometry: {
              coordinates: [52.370438514487, 4.90428768918262],
            },
          },
          {
            id:
              "G0363.376d57e9f24649db8d2a03ff996c2c1d~20051223175629~20160503164617",
            geometry: {
              coordinates: [52.3702637443156, 4.9043153028201],
            },
          },
          {
            id:
              "G0363.396127a9015f404795b5acc3808568d1~20051223175647~20160503164617",
            geometry: {
              coordinates: [52.3705954604083, 4.90411206637859],
            },
          },
          {
            id:
              "G0363.5a86b408d75c4f6288cd9217e67d594b~20051223175630~20160503164617",
            geometry: {
              coordinates: [52.3704747170414, 4.90481245762887],
            },
          },
          {
            id:
              "G0363.62f2518359024b09ad2d38788956c922~20051223175651~20160503164617",
            geometry: {
              coordinates: [52.370695240745, 4.90533369756735],
            },
          },
          {
            id:
              "G0363.64443347893a4462a2a64c5643e15f33~20051223175630~20160503164617",
            geometry: {
              coordinates: [52.3705161377, 4.90420087099772],
            },
          },
          {
            id:
              "G0363.657f35ef3da144c9b0044a9cab8b744d~20051223175647~20160503164617",
            geometry: {
              coordinates: [52.3705906393038, 4.90352556220802],
            },
          },
          {
            id:
              "G0363.68b256f073234bbba629491d6059fe56~20051223175630~20160503164617",
            geometry: {
              coordinates: [52.3703942559505, 4.90462200433021],
            },
          },
          {
            id:
              "G0363.6f39e985f0f046b0bede049682457cbe~20051223175651~20160503164617",
            geometry: {
              coordinates: [52.370819506211, 4.90562123704666],
            },
          },
          {
            id:
              "G0363.8ef5add18e6b437c96df364ff00d84e2~20051223175629~20160503164617",
            geometry: {
              coordinates: [52.3703697951395, 4.90436498323601],
            },
          },
          {
            id:
              "G0363.93ab39325d6e4df5afc4b02c105731f5~20051223175647~20160503164617",
            geometry: {
              coordinates: [52.3707573580705, 4.90393859095072],
            },
          },
          {
            id:
              "G0363.9916a75449174e709097c7eeaa27d30a~20051223175645~20160503164617",
            geometry: {
              coordinates: [52.3706987106787, 4.90378603404174],
            },
          },
          {
            id:
              "G0363.abc612c85a1348da98c3e42f4da4c293~20051223175637~20160503164617",
            geometry: {
              coordinates: [52.3700488668313, 4.90380885652741],
            },
          },
          {
            id:
              "G0363.b64a9908664f47a39a08cb0431ee8cbc~20051223175651~20160503164617",
            geometry: {
              coordinates: [52.3706333381144, 4.90518469851331],
            },
          },
          {
            id:
              "G0363.bda5f77346464795bf10b8418d3d5a90~20051223175629~20160503164617",
            geometry: {
              coordinates: [52.3701933737181, 4.90414421190167],
            },
          },
          {
            id:
              "G0363.c218196eb22949ca90e453953990ee5a~20051223175647~20160503164617",
            geometry: {
              coordinates: [52.3706476509254, 4.90366042762065],
            },
          },
          {
            id:
              "G0363.ea659d45c6b94a90bbfcf17697f6afba~20051223175650~20160503164617",
            geometry: {
              coordinates: [52.3705593780738, 4.90501026656054],
            },
          },
        ],
      },
    },
  },
};

export default trees;
