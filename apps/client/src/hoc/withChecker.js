import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import Context from "../context";
import { routes, geturl } from "../routes";
import withAddress from "./withAddress";
import LoadingPage from "../pages/LoadingPage";
import ErrorPage from "../pages/ErrorPage";
import getChecker from "../sttr_client";

const dir =
  process.env.REACT_APP_STTR_ENV === "production" ? "PROD" : "STAGING";

const withChecker = (Component) =>
  withAddress(({ ...rest }) => {
    const context = useContext(Context);
    const [checker, setChecker] = useState(context.checker);
    const [error, setError] = useState();

    const { topic } = rest;
    if (!context.address) {
      // TODO: doesn't withAddress already guarantee this? :-/
      console.warn("Address not found, redirecting to location page");
      return <Redirect to={geturl(routes.location, { slug: topic.slug })} />;
    }

    useEffect(() => {
      if (!checker && !error) {
        fetch(
          `${window.location.origin}/sttr/${dir.toLowerCase()}/${
            topic.sttrFile
          }`
        )
          .then((response) => response.json())
          .then((json) => {
            const checker = getChecker(json);
            if (context.answers) {
              checker.setData(context.answers);
            }

            checker.next();
            context.checker = checker;
            setChecker(checker);
          })
          .catch((e) => {
            setError(e);
          });
      }
    });

    if (error) {
      console.error(error);
      return <ErrorPage error={error} />;
    } else if (checker) {
      return <Component checker={checker} {...rest} />;
    } else {
      return <LoadingPage />;
    }
  });

export default withChecker;
