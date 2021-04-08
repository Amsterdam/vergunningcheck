import React, { FunctionComponent } from "react";

import { Loading } from "../../atoms";
import { autofillResolvers } from "../../config/autofill";
import { useChecker } from "../../hooks";
import { Intro } from ".";

const DynamicIMTRIntro: FunctionComponent = () => {
  const { checker } = useChecker();
  if (checker) {
    const dependantOnQuestions = checker.getUpcomingQuestions().length > 0;
    const dependantOnSituation =
      checker.getAutofillDataNeeds(autofillResolvers).length > 0;
    return <Intro {...{ dependantOnQuestions, dependantOnSituation }} />;
  } else {
    return <Loading />;
  }
};

export default DynamicIMTRIntro;
