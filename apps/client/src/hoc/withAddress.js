import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import Context from "../context";
import { routes, geturl } from "../routes";
import withTopic from "./withTopic";

const withAddress = (Component) =>
  withTopic(({ ...rest }) => {
    const { address } = useContext(Context);
    const { topic } = rest;
    if (!address) {
      console.warn("No address found, redirecting to location page");
      return <Redirect to={geturl(routes.location, { slug: topic.slug })} />;
    }
    return <Component address={address} {...rest} />;
  });

export default withAddress;
