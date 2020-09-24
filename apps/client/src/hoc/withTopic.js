import React, { useContext, useEffect } from "react";
import { Redirect, useLocation, useParams } from "react-router-dom";

import { sections } from "../config/matomo";
import { CheckerContext, SessionContext } from "../context";
import NotFoundPage from "../pages/NotFoundPage";
import RedirectPage from "../pages/RedirectPage";
import { geturl, routes } from "../routes";
import { findTopicBySlug } from "../utils";

const withTopic = (Component) => (props) => {
  const sessionContext = useContext(SessionContext);
  const checkerContext = useContext(CheckerContext);
  const { slug } = useParams();
  const { search } = useLocation();

  const topic = findTopicBySlug(slug);
  const params = new URLSearchParams(search);

  useEffect(() => {
    // Default settings to be able to open the CheckerPage
    if (!sessionContext[slug]) {
      sessionContext.setSessionData([
        slug,
        { activeComponents: [sections.LOCATION_INPUT], finishedComponents: [] },
      ]);
    }
  });

  if (params.get("resetChecker") || params.get("loadChecker")) {
    // @TODO: we need to replace this `loadChecker` URL with a decent solution

    checkerContext.checker = null;

    // Reset all but address from session
    sessionContext.setSessionData([
      slug,
      {
        answers: null,
        questionIndex: 0,
      },
    ]);

    if (params.get("resetChecker")) {
      console.warn("Resetting checker, redirecting to intro page");
      return <Redirect to={geturl(routes.intro, topic)} />;
    }
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
