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
              streetName: "Louise de Colignystraat",
              postalCode: "1055XD",
              houseNumber: 19,
              houseNumberFull: "19 A",
              residence: "Amsterdam",
            },
            {
              __typename: "Address",
              id: "MDM2MzAxMDAxMjA2MjA0Mw==",
              streetName: "Louise de Colignystraat",
              postalCode: "1055XD",
              houseNumber: 19,
              houseNumberFull: "19 B",
              residence: "Amsterdam",
            },
            {
              __typename: "Address",
              id: "MDM2MzAxMDAxMjA2MjA2NA==",
              streetName: "Louise de Colignystraat",
              postalCode: "1055XD",
              houseNumber: 19,
              houseNumberFull: "19 C",
              residence: "Amsterdam",
            },
            {
              __typename: "Address",
              id: "MDM2MzAxMDAxMjA2MjA2Mg==",
              streetName: "Louise de Colignystraat",
              postalCode: "1055XD",
              houseNumber: 19,
              houseNumberFull: "19 D",
              residence: "Amsterdam",
            },
            {
              __typename: "Address",
              id: "MDM2MzAxMDAxMjA2MjA4Ng==",
              streetName: "Louise de Colignystraat",
              postalCode: "1055XD",
              houseNumber: 19,
              houseNumberFull: "19 E",
              residence: "Amsterdam",
            },
            {
              __typename: "Address",
              id: "MDM2MzAxMDAxMjA2MjA4NA==",
              streetName: "Louise de Colignystraat",
              postalCode: "1055XD",
              houseNumber: 19,
              houseNumberFull: "19 F",
              residence: "Amsterdam",
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
      data: null,
      errors: [
        {
          stack: ["GraphQLError: ..."],
          message: "...",
        },
      ],
    },
  },
];
