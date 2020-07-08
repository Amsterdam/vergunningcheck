import { getRestrictionByTypeName } from "../utils";

const getDataNeed = (checker) =>
  checker && checker.getAutofillDataNeeds(autofillMap).shift();

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
        return `"${monumentData.name}"`;
      }
    }
    return '"Geen monument"';
  },
};

/**
 * map from autofill-resolver key to the data-need it has.
 */
export const autofillMap = {
  monumentList: "address",
  monumentBoolean: "address",
  cityScape: "address",
};
