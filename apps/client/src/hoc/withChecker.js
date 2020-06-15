import React, { useState, useEffect, useContext } from "react";
import Context from "../context";
import withTopic from "./withTopic";
import LoadingPage from "../pages/LoadingPage";
import ErrorPage from "../pages/ErrorPage";
import getChecker from "../sttr_client";

const dir =
  process.env.REACT_APP_STTR_ENV === "production" ? "PROD" : "STAGING";

const withChecker = (Component) =>
  withTopic((props) => {
    const context = useContext(Context);
    const [checker, setChecker] = useState(context.checker);
    const [error, setError] = useState();
    const {
      topic: { sttrFile },
    } = props;

    if (sttrFile) {
      useEffect(() => {
        if (!checker && !error) {
          fetch(
            `${window.location.origin}/sttr/${dir.toLowerCase()}/${sttrFile}`
          )
            .then((response) => response.json())
            .then((json) => {
              const newChecker = getChecker(json);
              context.checker = newChecker;
              setChecker(newChecker);
            })
            .catch((e) => {
              setError(e);
            });
        }
      });
    }

    if (error) {
      console.error(error);
      return <ErrorPage error={error} {...props} />;
    } else if (!sttrFile) {
      return <Component checker={null} {...props} />;
    } else if (checker) {
      return <Component checker={checker} {...props} />;
    } else {
      return <LoadingPage {...props} />;
    }
  });

export default withChecker;
