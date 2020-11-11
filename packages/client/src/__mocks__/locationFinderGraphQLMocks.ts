import { loader } from "graphql.macro";
const findAddress = loader("../components/Location/LocationFinder.graphql");

export default [
  {
    request: {
      query: findAddress,
      variables: {
        extraHouseNumberFull: "",
        houseNumberFull: "1",
        postalCode: "1055XD",
        queryExtra: false,
      },
    },
    result: {
      data: {
        findAddress: {
          exactMatch: null,
          matches: [],
        },
      },
    },
  },
  {
    request: {
      query: findAddress,
      variables: {
        extraHouseNumberFull: "",
        houseNumberFull: "19",
        postalCode: "1055XD",
        queryExtra: false,
      },
    },
    result: {
      data: {
        findAddress: {
          exactMatch: null,
          matches: [
            {
              __typename: "Address",
              id: "MDM2MzAxMDAxMjA2MjEzNA==",
              houseNumber: 19,
              houseNumberFull: "19 A",
              postalCode: "1055XD",
              residence: "Amsterdam",
              streetName: "Louise de Colignystraat",
            },
            {
              __typename: "Address",
              id: "MDM2MzAxMDAxMjA2MjA0Mw==",
              houseNumber: 19,
              houseNumberFull: "19 B",
              postalCode: "1055XD",
              residence: "Amsterdam",
              streetName: "Louise de Colignystraat",
            },
            {
              __typename: "Address",
              id: "MDM2MzAxMDAxMjA2MjA2NA==",
              houseNumber: 19,
              houseNumberFull: "19 C",
              postalCode: "1055XD",
              residence: "Amsterdam",
              streetName: "Louise de Colignystraat",
            },
            {
              __typename: "Address",
              id: "MDM2MzAxMDAxMjA2MjA2Mg==",
              houseNumber: 19,
              houseNumberFull: "19 D",
              postalCode: "1055XD",
              residence: "Amsterdam",
              streetName: "Louise de Colignystraat",
            },
            {
              __typename: "Address",
              id: "MDM2MzAxMDAxMjA2MjA4Ng==",
              houseNumber: 19,
              houseNumberFull: "19 E",
              postalCode: "1055XD",
              residence: "Amsterdam",
              streetName: "Louise de Colignystraat",
            },
            {
              __typename: "Address",
              id: "MDM2MzAxMDAxMjA2MjA4NA==",
              houseNumber: 19,
              houseNumberFull: "19 F",
              postalCode: "1055XD",
              residence: "Amsterdam",
              streetName: "Louise de Colignystraat",
            },
          ],
        },
      },
    },
  },
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
              },
            ],
            districtName: "Landlust",
            neighborhoodName: "Landlust Noord",
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
  {
    request: {
      query: findAddress,
      variables: {
        extraHouseNumberFull: "",
        houseNumberFull: "666",
        postalCode: "6666AB",
        queryExtra: false,
      },
    },
    result: {
      data: {
        findAddress: {
          exactMatch: null,
          matches: [],
        },
      },
    },
  },
];
