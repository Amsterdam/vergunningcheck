import { loader } from "graphql.macro";
const findAddress = loader("../components/Location/LocationFinder.graphql");

export default [
  {
    request: {
      query: findAddress,
      variables: {
        extraHouseNumberFull: "",
        houseNumberFull: "19c",
        postalCode: "1055XD",
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
            districtName: "Landlust",
            neigborhoodName: "Landlust Noord",
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
