import React, { useState, useEffect, useContext } from "react";

import { SessionContext, CheckerContext } from "../context";
import withAddress from "./withAddress";
import getChecker from "../sttr_client";
import LoadingPage from "../pages/LoadingPage";
import ErrorPage from "../pages/ErrorPage";

const dir =
  process.env.REACT_APP_STTR_ENV === "production" ? "PROD" : "STAGING";

const withChecker = (Component) =>
  withAddress(({ ...rest }) => {
    const sessionContext = useContext(SessionContext);
    const checkerContext = useContext(CheckerContext);
    const [checker, setChecker] = useState(checkerContext.checker);
    const [error, setError] = useState();

    const { topic } = rest;

    useEffect(() => {
      // Load new `sttr-checker` file and store in the Context
      if (!checker && !error) {
        fetch(
          `${window.location.origin}/sttr/${dir.toLowerCase()}/${
            topic.sttrFile
          }`
        )
          .then((response) => response.json())
          .then((json) => {
            const checker = getChecker(json);
            if (sessionContext.answers) {
              checker.setQuestionAnswers(sessionContext.answers);
              // In case of reload, rewind to the current question
              checker.rewindTo(sessionContext.questionIndex);
            } else {
              checker.next();
            }

            // Store the entire `sttr-checker` in React Context
            checkerContext.checker = checker;
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
