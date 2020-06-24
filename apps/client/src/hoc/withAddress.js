import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import { SessionContext } from "../context";
import { geturl, routes } from "../routes";
import withTopic from "./withTopic";

const withAddress = (Component) =>
  withTopic(({ ...rest }) => {
    const sessionContext = useContext(SessionContext);
    const sessionAddress = sessionContext.address || {};
    const { topic } = rest;
    if (!sessionAddress[topic.slug]) {
      console.warn("No address found, redirecting to location page");
      return <Redirect to={geturl(routes.location, { slug: topic.slug })} />;
    }
    return (
      <Component address={sessionAddress[topic.slug]} {...rest}></Component>
    );
  });

export default withAddress;
