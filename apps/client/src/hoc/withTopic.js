import React, { useContext } from "react";
import { CheckerContext } from "../context";
import { useParams, Redirect, useLocation } from "react-router-dom";

import { topics } from "../config";
import { geturl, routes } from "../routes";

import RedirectPage from "../pages/RedirectPage";
import NotFoundPage from "../pages/NotFoundPage";

const withTopic = (Component) => (props) => {
  const checkerContext = useContext(CheckerContext);
  const { slug } = useParams();
  const { search } = useLocation();

  const topic = topics.find((t) => t.slug === slug);
  const params = new URLSearchParams(search);

  if (params.get("resetChecker")) {
    checkerContext.checker = null;
    console.warn("Resseting checker, redirecting to intro page");
    return <Redirect to={geturl(routes.intro, topic)} />;
  }

  if (topic) {
    // redirect to olo if needed
    if (topic.redirectToOlo) {
      return <RedirectPage topic={topic} />;
    }

    checkerContext.topic = topic;
    return <Component {...props} topic={topic} />;
  }

  return <NotFoundPage />;
};

export default withTopic;
