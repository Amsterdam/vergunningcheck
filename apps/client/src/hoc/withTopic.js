import React, { useContext } from "react";
import { SessionContext, CheckerContext } from "../context";
import { useParams, Redirect, useLocation } from "react-router-dom";
import { topics } from "../config";
import NotFoundPage from "../pages/NotFoundPage";
import { geturl, routes } from "../routes";

const withTopic = (Component) => () => {
  const context = useContext(SessionContext);
  const checkerContext = useContext(CheckerContext);
  const { slug } = useParams();
  const { search } = useLocation();

  const topic = topics.find((t) => t.slug === slug);
  const params = new URLSearchParams(search);

  if (params.get("resetChecker")) {
    checkerContext.checker = null;
    // TODO: Remove this warning?
    console.warn("Resseting checker, redirecting to intro page");
    return <Redirect to={geturl(routes.intro, { slug: topic.slug })} />;
  }

  if (topic) {
    context.topic = topic;
    return <Component topic={topic} />;
  }
  return <NotFoundPage />;
};

export default withTopic;
