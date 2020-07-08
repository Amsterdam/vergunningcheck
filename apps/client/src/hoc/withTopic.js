import React, { useContext } from "react";
import { Redirect, useLocation, useParams } from "react-router-dom";

import { topics } from "../config";
import { CheckerContext } from "../context";
import NotFoundPage from "../pages/NotFoundPage";
import { geturl, routes } from "../routes";

const withTopic = (Component) => () => {
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
    checkerContext.topic = topic;
    return <Component topic={topic} />;
  }
  return <NotFoundPage />;
};

export default withTopic;
