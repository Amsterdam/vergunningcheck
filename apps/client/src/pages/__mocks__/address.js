import { loader } from "graphql.macro";
const findAddress = loader("../../components/Location/LocationFinder.graphql");

export default [
  {
    request: {
      query: findAddress,
      variables: {
        postalCode: "1055xd",
        houseNumberFull: "19c",
        extraHouseNumberFull: "19c",
        queryExtra: false,
      },
    },
    result: {
      data: {
        findAddress: {
          __typename: "",
          exactMatch: {
            __typename: "Address",
            id: "MDM2MzAxMDAxMjA2MjA2NA==",
            streetName: "Louise de Colignystraat",
            postalCode: "1055XD",
            houseNumber: 19,
            houseNumberFull: "19 C",
            residence: "Amsterdam",
            restrictions: [
              {
                __typename: "Monument",
                name: "Gemeentelijk monument",
              },
            ],
            zoningPlans: [
              {
                __typename: "",
                name: "Paraplubestemmingsplan Stadsdeel West",
              },
              {
                __typename: "",
                name: "Landlust en Gibraltarbuurt",
              },
              {
                __typename: "",
                name: "Aanpassen geluidzone Westpoort en Hoogtij",
              },
              {
                __typename: "",
                name: "Drijvende bouwwerken",
              },
            ],
          },
          matches: [],
        },
      },
    },
  },
];
