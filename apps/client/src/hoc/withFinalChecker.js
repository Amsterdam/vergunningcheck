import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { routes, geturl } from "../routes";
import Context from "../context";

const withFinalChecker = (Component) => () => {
  const context = useContext(Context);

  const finishedPermit = context.checker.permits.find(
    (permit) => !!permit.getOutputByDecisionId("dummy")
  );
  if (!finishedPermit) {
    console.warn("Checker not final, redirecting to question page");
    return (
      <Redirect to={geturl(routes.questions, { slug: context.topic.slug })} />
    );
  }
  return <Component checker={context.checker} topic={context.topic} />;
};

export default withFinalChecker;
