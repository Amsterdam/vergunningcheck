import { AddressType } from "../types";

export default {
  districtName: "mock",
  houseNumberFull: "123",
  houseNumber: 123,
  id: "mock",
  neighborhoodName: "mock",
  postalCode: "1234 AB",
  residence: "Amsterdam",
  restrictions: [
    {
      __typename: "CityScape",
      name: "cityscape",
      scope: "MUNICIPAL",
    },
  ],
  streetName: "streetname",
  zoningPlans: [
    {
      name: "zoningplan",
    },
  ],
} as AddressType;
