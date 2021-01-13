import {
  AutofillData,
  AutofillResolverMap,
  Checker,
  Question,
  addQuotes,
} from "@vergunningcheck/imtr-client";

import { getRestrictionByTypeName } from "../utils";

type AutofillResolverNameMap = { [name: string]: string };

export const getDataNeed = (checker?: Checker) =>
  checker && checker.getAutofillDataNeeds(autofillResolvers)[0];

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
    type Options = { [id: string]: string };
    const answers: Options = {
      NATIONAL:
        "Ja, het gebouw ligt in een rijksbeschermd stads- of dorpsgezicht.",
      MUNICIPAL:
        "Ja, het gebouw ligt in een gemeentelijk beschermd stads- of dorpsgezicht.",
      undefined:
        "Nee, het gebouw ligt niet in een beschermd stads- of dorpsgezicht.",
    };

    const cityScape =
      address?.restrictions &&
      getRestrictionByTypeName(address.restrictions, "CityScape");

    // This resolver can be used for boolean and list-questions
    return question.options
      ? addQuotes(answers[cityScape?.scope as string])
      : !!cityScape;
  },
  cityScapeWithoutEntity: ({ address }: AutofillData, question: Question) => {
    type Options = { [id: string]: string };
    const answers: Options = {
      NATIONAL: "Ja, in een rijksbeschermd stads- of dorpsgezicht.",
      MUNICIPAL: "Ja, in een gemeentelijk beschermd stads- of dorpsgezicht.",
      undefined: "Nee",
    };

    const cityScape =
      address?.restrictions &&
      getRestrictionByTypeName(address.restrictions, "CityScape");

    return question.options
      ? addQuotes(answers[cityScape?.scope as string])
      : !!cityScape;
  },
  monumentOnAddress: ({ address }: AutofillData) => {
    type Options = { [id: string]: string };
    const answers: Options = {
      NATIONAL: "Ja, een rijksmonument.",
      MUNICIPAL: "Ja, een gemeentelijk monument.",
      undefined: "Nee, geen monument.",
    };

    const monument =
      address?.restrictions &&
      getRestrictionByTypeName(address.restrictions, "Monument");

    return addQuotes(answers[monument?.scope as string]);
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
        return addQuotes(monumentData.name);
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
