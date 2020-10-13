import React from "react";

import { autofillMap } from "../../config/autofill";
import { Intro } from ".";

type Props = {
  // @TODO: replace any with actual CheckerType when available
  checker: any;
};

export default ({ checker }: Props) => {
  const dependantOnQuestions = checker._getUpcomingQuestions().length > 0;
  const dependantOnSituation =
    checker.getAutofillDataNeeds(autofillMap).length > 0;
  return <Intro {...{ dependantOnQuestions, dependantOnSituation }} />;
};
