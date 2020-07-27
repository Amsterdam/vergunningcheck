import React from "react";
import { Redirect } from "react-router-dom";

import { geturl, routes } from "../routes";
import withAutofillData from "./withAutofillData";

const withConclusion = (Component) =>
  withAutofillData((props) => {
    const { checker, topic } = props;
    // If we have an unfinshed permit and no contact-permits -> redirect.
    if (!checker.isConclusive()) {
      console.warn("Checker not final, redirecting to question page");
      return <Redirect to={geturl(routes.questions, topic)} />;
    }
    return <Component {...props} />;
  });

export default withConclusion;
