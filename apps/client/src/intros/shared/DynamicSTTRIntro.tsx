import React from "react";

import { autofillMap } from "../../config/autofill";
import { Intro } from ".";

type Props = {
  checker: any;
};

export default ({ checker }: Props) => {
  const dependantOnQuestions = checker._getUpcomingQuestions().length > 0;
  const dependantOnSituation = checker.getAutofillDataNeeds(autofillMap);
  return <Intro {...{ dependantOnQuestions, dependantOnSituation }} />;
};
