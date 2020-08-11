import { addQuotes, getRestrictionByTypeName } from "../utils";

const getDataNeed = (checker) =>
  checker && checker.getAutofillDataNeeds(autofillMap)[0];

export const getDataNeedPageOrNext = (checker, autofillRoutes, routes) =>
  getDataNeed(checker)
    ? autofillRoutes[getDataNeed(checker)][0]
    : routes.checker;

const strings = {
  NO_MONUMENT: "Geen monument",
};

export const getDataNeedResultPageOrPrevious = (
  checker,
  autofillRoutes,
  routes
) => {
  const dataNeed = getDataNeed(checker);
  if (dataNeed) {
    const routesForDataNeed = autofillRoutes[dataNeed];
    return routesForDataNeed[routesForDataNeed.length - 1];
  }
  return routes.intro;
};

/**
 * This object contains a resolver map from key to the function that
 * resolves. The function accepts autofill data to do it's thing.
 * Monument can either be a bool or list question, that why we need 2.
 */
export const autofillResolvers = {
  cityScape: ({ address }) =>
    address?.restrictions &&
    !!getRestrictionByTypeName(address.restrictions, "CityScape"),
  monumentBoolean: ({ address }) =>
    address?.restrictions &&
    !!getRestrictionByTypeName(address.restrictions, "Monument"),
  monumentList: ({ address }) => {
    if (address?.restrictions) {
      const monumentData = getRestrictionByTypeName(
        address.restrictions,
        "Monument"
      );
      if (monumentData) {
        return addQuotes(monumentData.name);
      }
    }
    return addQuotes(strings.NO_MONUMENT);
  },
};

/**
 * Map from autofill-resolver key to the data-need it has.
 */
export const autofillMap = {
  monumentList: "checker",
  monumentBoolean: "checker",
  cityScape: "checker",
};
