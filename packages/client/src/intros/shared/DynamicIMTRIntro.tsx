import React from "react";

import { autofillResolvers } from "../../config/autofill";
import { useChecker } from "../../hooks";
import LoadingPage from "../../pages/LoadingPage";
import { Intro } from ".";
import { IntroProps } from "..";

const DynamicIMTRIntro: IntroProps = () => {
  const { checker } = useChecker();
  if (checker) {
    const dependantOnQuestions = checker._getUpcomingQuestions().length > 0;
    const dependantOnSituation =
      checker.getAutofillDataNeeds(autofillResolvers).length > 0;
    return <Intro {...{ dependantOnQuestions, dependantOnSituation }} />;
  } else {
    return <LoadingPage />;
  }
};

export default DynamicIMTRIntro;
