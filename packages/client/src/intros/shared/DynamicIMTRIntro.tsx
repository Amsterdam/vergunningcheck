import { Checker } from "@vergunningcheck/imtr-client";
import React from "react";

import { autofillResolvers } from "../../config/autofill";
import { Intro } from ".";

type Props = {
  checker: Checker;
};

export default ({ checker }: Props) => {
  const dependantOnQuestions = checker._getUpcomingQuestions().length > 0;
  const dependantOnSituation =
    checker.getAutofillDataNeeds(autofillResolvers).length > 0;
  return <Intro {...{ dependantOnQuestions, dependantOnSituation }} />;
};
