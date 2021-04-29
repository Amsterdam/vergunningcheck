import {
  AutofillData,
  AutofillResolverMap,
  Checker,
  Question,
  addQuotes,
} from "@vergunningcheck/imtr-client";

import { getRestrictionByTypeName } from "../utils";

type AutofillResolverNameMap = { [name: string]: string };
type Options = { [id: string]: string };

export const getDataNeed = (checker?: Checker) =>
  checker && checker.getAutofillDataNeeds(autofillResolvers)[0];

export const cityScapeForBuildingAnswers: Options = {
  NATIONAL: "Ja, het gebouw ligt in een rijksbeschermd stads- of dorpsgezicht.",
  MUNICIPAL:
    "Ja, het gebouw ligt in een gemeentelijk beschermd stads- of dorpsgezicht.",
  undefined:
    "Nee, het gebouw ligt niet in een beschermd stads- of dorpsgezicht.",
};

export const cityScapeWithoutEntityAnswers: Options = {
  NATIONAL: "Ja, in een rijksbeschermd stads- of dorpsgezicht.",
  MUNICIPAL: "Ja, in een gemeentelijk beschermd stads- of dorpsgezicht.",
  undefined: "Nee",
};

export const monumentAnswers: Options = {
  NATIONAL: "Ja, een rijksmonument.",
  MUNICIPAL: "Ja, een gemeentelijk monument.",
  undefined: "Nee, geen monument.",
};

const strings = {
  NO_MONUMENT: "Geen monument",
};

/**
 * This object contains a resolver map from key to the function that
 * resolves. The function accepts autofill data to do it's thing.
 * Monument can either be a bool or list question, that why we need 2.
 */
export const autofillResolvers: AutofillResolverMap = {
  cityScapeForBuilding: ({ address }: AutofillData, question: Question) => {
    const cityScape =
      address?.restrictions &&
      getRestrictionByTypeName(address.restrictions, "CityScape");

    // This resolver can be used for boolean and list-questions
    return question.options
      ? addQuotes(cityScapeForBuildingAnswers[cityScape?.scope as string])
      : !!cityScape;
  },
  cityScapeWithoutEntity: ({ address }: AutofillData, question: Question) => {
    const cityScape =
      address?.restrictions &&
      getRestrictionByTypeName(address.restrictions, "CityScape");

    return question.options
      ? addQuotes(cityScapeWithoutEntityAnswers[cityScape?.scope as string])
      : !!cityScape;
  },
  monumentOnAddress: ({ address }: AutofillData) => {
    const monument =
      address?.restrictions &&
      getRestrictionByTypeName(address.restrictions, "Monument");

    return addQuotes(monumentAnswers[monument?.scope as string]);
  },
  monumentBoolean: ({ address }) =>
    address?.restrictions &&
    !!getRestrictionByTypeName(address.restrictions, "Monument"),
  monumentList: ({ address }) => {
    if (address?.restrictions) {
      const monumentData = getRestrictionByTypeName(
        address.restrictions,
        "Monument"
      );
      if (monumentData?.name) {
        // We decided that `in procedure monuments` should be mapped to actual monuments
        const monument = monumentData.name
          .replace(
            "In procedure Gemeentelijk Monument",
            "Gemeentelijk monument"
          )
          .replace("In procedure Rijksmonument", "Rijksmonument");
        return addQuotes(monument);
      }
    }
    return addQuotes(strings.NO_MONUMENT);
  },
};

/**
 * Map from autofill-resolver key to the data-need it has.
 */
export const autofillResolverNameMap: AutofillResolverNameMap = {
  monumentList: "address",
  monumentBoolean: "address",
  cityScape: "address",
};
