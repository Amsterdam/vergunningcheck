import { getRestrictionByTypeName } from "../utils";

const getDataNeed = (checker) =>
  checker.getAutofillDataNeeds(autofillMap).shift();

export const getDataNeedPageOrNext = (checker, autofillRoutes, routes) => {
  const dataNeed = getDataNeed(checker);
  return dataNeed ? autofillRoutes[dataNeed].shift() : routes.questions;
};

export const getDataNeedResultPageOrPrevious = (
  checker,
  autofillRoutes,
  routes
) => {
  const dataNeed = getDataNeed(checker);
  return dataNeed ? autofillRoutes[dataNeed].pop() : routes.intro;
};

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
    return '"Geen monument"';
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
};
