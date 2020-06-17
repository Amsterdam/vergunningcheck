import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { SessionContext } from "../context";
import { routes, geturl } from "../routes";
import withTopic from "./withTopic";

const withAddress = (Component) =>
  withTopic(({ ...rest }) => {
    const { address } = useContext(SessionContext);
    const { topic } = rest;
    if (!address) {
      console.warn("No address found, redirecting to location page");
      return <Redirect to={geturl(routes.location, { slug: topic.slug })} />;
    }
    return <Component address={address[topic.slug]} {...rest}></Component>;
  });

export default withAddress;
