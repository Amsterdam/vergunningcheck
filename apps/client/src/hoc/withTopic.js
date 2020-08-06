import React, { useContext } from "react";
import { Redirect, useLocation, useParams } from "react-router-dom";

import { topics } from "../config";
import { Flow } from "../config/";
import { CheckerContext, SessionContext } from "../context";
import NotFoundPage from "../pages/NotFoundPage";
import RedirectPage from "../pages/RedirectPage";
import { geturl, routes } from "../routes";

const withTopic = (Component) => (props) => {
  const sessionContext = useContext(SessionContext);
  const checkerContext = useContext(CheckerContext);
  const { slug } = useParams();
  const { search } = useLocation();

  const topic = topics.find((t) => t.slug === slug);
  const params = new URLSearchParams(search);

  if (params.get("resetChecker")) {
    checkerContext.checker = null;

    // Reset all but address from session
    sessionContext.setSessionData([
      slug,
      {
        answers: null,
        questionIndex: 0,
      },
    ]);

    console.warn("Resetting checker, redirecting to intro page");
    return <Redirect to={geturl(routes.intro, topic)} />;
  }

  if (topic) {
    if (!sessionContext[slug]) {
      sessionContext.setSessionData([
        slug,
        { activeComponents: ["locationInput"], finishedComponents: [] },
      ]);
    }
    // redirect to olo if needed
    if (topic.flow === Flow.oloRedirect) {
      return <RedirectPage topic={topic} />;
    }

    checkerContext.topic = topic;
    return <Component {...props} topic={topic} />;
  } else if (slug) {
    // must be simple checker
    return <Component {...props} topic={{ slug }} />;
  }

  return <NotFoundPage />;
};

export default withTopic;
