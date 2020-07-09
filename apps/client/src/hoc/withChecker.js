import React, { useContext, useEffect, useState } from "react";

import { CheckerContext, SessionContext } from "../context";
import ErrorPage from "../pages/ErrorPage";
import LoadingPage from "../pages/LoadingPage";
import getChecker from "../sttr_client";
import withTopic from "./withTopic";

const dir =
  process.env.REACT_APP_STTR_ENV === "production" ? "prod" : "staging";

const withChecker = (Component) =>
  withTopic((props) => {
    const sessionContext = useContext(SessionContext);
    const checkerContext = useContext(CheckerContext);
    const [checker, setChecker] = useState(checkerContext.checker);
    const [error, setError] = useState();
    const { topic } = props;
    const { sttrFile, slug } = topic;

    if (sttrFile) {
      useEffect(() => {
        if (!checker && !error) {
          fetch(`${window.location.origin}/sttr/${dir}/${sttrFile}`)
            .then((response) => response.json())
            .then((json) => {
              const newChecker = getChecker(json);
              if (sessionContext[slug]?.answers) {
                newChecker.setQuestionAnswers(sessionContext[slug].answers);
                // In case of reload, rewind to the current question
                newChecker.rewindTo(sessionContext[slug].questionIndex);
              }
              // Store the entire `sttr-checker` in React Context
              checkerContext.checker = newChecker;
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
      return <LoadingPage />;
    }
  });

export default withChecker;
