import React from "react";
import { Redirect } from "react-router-dom";
import { routes, geturl } from "../routes";
import withAutofillData from "./withAutofillData";

const withConclusion = (Component) =>
  withAutofillData((props) => {
    const finishedPermit = props.checker.permits.find(
      (permit) => !!permit.getOutputByDecisionId("dummy")
    );
    if (!finishedPermit) {
      console.warn("Checker not final, redirecting to question page");
      return (
        <Redirect to={geturl(routes.questions, { slug: props.topic.slug })} />
      );
    }
    return <Component {...props} />;
  });

export default withConclusion;
