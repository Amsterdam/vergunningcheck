import React from "react";
import { useParams } from "react-router-dom";
import { topics } from "../config";
import RedirectPage from "../pages/RedirectPage";

const withOloRedirect = (Component) => () => {
  const { slug } = useParams();
  const topic = topics.find((t) => t.slug === slug);

  if (topic && topic.redirectToOlo) {
    return <RedirectPage topic={topic} />;
  }

  return <Component />;
};

export default withOloRedirect;
