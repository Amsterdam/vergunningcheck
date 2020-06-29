import React, { useState, useEffect, useContext } from "react";
import withTopic from "./withTopic";

import { SessionContext, CheckerContext } from "../context";
import getChecker from "../sttr_client";
import LoadingPage from "../pages/LoadingPage";
import ErrorPage from "../pages/ErrorPage";

const dir =
  process.env.REACT_APP_STTR_ENV === "production" ? "PROD" : "STAGING";

const withChecker = (Component) =>
  withTopic((props) => {
    const sessionContext = useContext(SessionContext);
    const checkerContext = useContext(CheckerContext);
    const [checker, setChecker] = useState(checkerContext.checker);
    const [error, setError] = useState();
    const { topic } = props;
    const { sttrFile } = topic;

    if (sttrFile) {
      useEffect(() => {
        if (!checker && !error) {
          fetch(
            `${window.location.origin}/sttr/${dir.toLowerCase()}/${sttrFile}`
          )
            .then((response) => response.json())
            .then((json) => {
              const newChecker = getChecker(json);
              if (sessionContext.answers) {
                checker.setQuestionAnswers(sessionContext.answers);
                // In case of reload, rewind to the current question
                checker.rewindTo(sessionContext.questionIndex);
                // } else {
                //   checker.next();
              }
              // Store the entire `sttr-checker` in React Context
              checkerContext.checker = checker;
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
