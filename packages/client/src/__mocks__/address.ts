import { loader } from "graphql.macro";
const findAddress = loader("../components/Location/LocationFinder.graphql");

export default [
  {
    request: {
      query: findAddress,
      variables: {
        extraHouseNumberFull: "",
        houseNumberFull: "19 C",
        postalCode: "1055XD",
        queryExtra: false,
      },
    },
    result: {
      data: {
        findAddress: {
          exactMatch: {
            __typename: "Address",
            id: "MDM2MzAxMDAxMjA2MjA2NA==",
            houseNumber: 19,
            houseNumberFull: "19 C",
            postalCode: "1055XD",
            residence: "Amsterdam",
            streetName: "Louise de Colignystraat",
            restrictions: [
              {
                __typename: "Monument",
                name: "Gemeentelijk monument",
                scope: "MUNICIPAL",
              },
            ],
            districtName: "", // Purposely made empty
            neighborhoodName: "", // Purposely made empty
            zoningPlans: [
              {
                name: "Paraplubestemmingsplan Stadsdeel West",
              },
              {
                name: "Aanpassen geluidzone Westpoort en Hoogtij",
              },
              {
                name: "Landlust en Gibraltarbuurt",
              },
              {
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
