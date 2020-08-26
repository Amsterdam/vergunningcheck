import React, { useContext, useEffect, useState } from "react";

import { autofillMap, autofillResolvers } from "../config/autofill";
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
    const address = sessionContext[topic.slug]?.address;

    useEffect(() => {
      // Default settings to be able to open the CheckerPage
      if (!sessionContext[slug]) {
        sessionContext.setSessionData([
          slug,
          { activeComponents: ["locationInput"], finishedComponents: [] },
        ]);
      }

      if (sttrFile) {
        initChecker();
      }
    });

    const initChecker = () => {
      if (!checker && !error) {
        fetch(`${window.location.origin}/sttr/${dir}/${sttrFile}`)
          .then((response) => response.json())
          .then((json) => {
            const newChecker = getChecker(json);
            // Find if we have missing data needs
            if (address) {
              newChecker.autofill(autofillResolvers, { address });
            }
            const unfulfilledDataNeed = newChecker.getAutofillDataNeeds(
              autofillMap,
              true
            )[0];

            if (sessionContext[slug]?.answers && !unfulfilledDataNeed) {
              newChecker.setQuestionAnswers(sessionContext[slug].answers);
            }
            // Store the entire `sttr-checker` in React Context
            checkerContext.checker = newChecker;
            setChecker(newChecker);
          })
          .catch((e) => {
            setError(e);
          });
      }
    };

    const resetChecker = () => {
      setChecker(null);
      initChecker();
    };

    if (error) {
      console.error(error);
      return <ErrorPage error={error} {...props} />;
    } else if (!sttrFile) {
      return <Component checker={null} {...props} />;
    } else if (checker) {
      return (
        <Component checker={checker} resetChecker={resetChecker} {...props} />
      );
    } else {
      return <LoadingPage />;
    }
  });

export default withChecker;
