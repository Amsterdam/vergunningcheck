import { getRestrictionByTypeName } from "./utils";

export const autofillResolvers = {
  monumentBoolean: ({ address }) =>
    address?.restrictions
      ? !!getRestrictionByTypeName(address.restrictions, "Monument")
      : undefined,
  monumentList: ({ address }) => {
    if (address?.restrictions) {
      const monumentData = getRestrictionByTypeName(
        address.restrictions,
        "Monument"
      );
      if (monumentData) {
        return `"${monumentData.name}"`;
      }
    }
  },
  cityScape: ({ address }) =>
    address?.restrictions
      ? !!getRestrictionByTypeName(address.restrictions, "CityScape")
      : undefined,
};

export const autofillMap = {
  monumentList: "address",
  monumentBoolean: "address",
  cityScape: "address",
  // geo: 'map', // for trees ?
};
