import React, { useContext } from "react";
import { useParams, Redirect, useLocation } from "react-router-dom";

import Context from "../context";
import { topics } from "../config";
import { geturl, routes } from "../routes";

import RedirectPage from "../pages/RedirectPage";
import NotFoundPage from "../pages/NotFoundPage";

const withTopic = (Component) => (props) => {
  const context = useContext(Context);
  const { slug } = useParams();
  const { search } = useLocation();

  const topic = topics.find((t) => t.slug === slug);
  const params = new URLSearchParams(search);

  if (params.get("resetChecker")) {
    context.checker = null;
    console.log("Reset checker and redirect to intro page");
    return <Redirect to={geturl(routes.intro, { slug: topic.slug })} />;
  }

  if (topic) {
    // redirect to olo if needed
    if (topic.redirectToOlo) {
      return <RedirectPage topic={topic} {...props} />;
    }

    context.topic = topic;
    return <Component {...props} topic={topic} />;
  }

  return <NotFoundPage {...props} />;
};

export default withTopic;
