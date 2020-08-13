import React, { useContext, useEffect, useState } from "react";

import { Flow as FlowType } from "../config";
import { autofillMap, autofillResolvers } from "../config/autofill";
import { CheckerContext, SessionContext } from "../context";
import ErrorPage from "../pages/ErrorPage";
import LoadingPage from "../pages/LoadingPage";
import getChecker from "../sttr_client";
import withTopic from "./withTopic";

const withChecker = (Component) =>
  withTopic((props) => {
    const sessionContext = useContext(SessionContext);
    const checkerContext = useContext(CheckerContext);
    const [checker, setChecker] = useState(checkerContext.checker);
    const [error, setError] = useState();
    const { topic } = props;
    const { flow, slug } = topic;
    const address = sessionContext[topic.slug]?.address;

    useEffect(() => {
      if (flow !== FlowType.olo) {
        initChecker();
      }
      if (!sessionContext[slug]) {
        sessionContext.setSessionData([
          slug,
          { activeComponents: ["locationInput"], finishedComponents: [] },
        ]);
      }
    });

    const initChecker = async () => {
      if (!checker && !error) {
        try {
          const topicsRequest = await fetch(
            `${window.location.origin}/topics.json`
          );
          const topics = await topicsRequest.json();

          const topicConfig = topics
            .flat()
            .find((topic) => topic.slug === slug);
          const topicRequest = await fetch(
            `${window.location.origin}/${topicConfig.path}.json`
          );
          const topic = await topicRequest.json();

          const newChecker = getChecker(topic);
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
        } catch (e) {
          setError(e);
        }
      }
    };

    const resetChecker = () => {
      setChecker(null);
      initChecker();
    };

    if (error) {
      console.error(error);
      return <ErrorPage error={error} {...props} />;
    } else if (flow === FlowType.olo) {
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
