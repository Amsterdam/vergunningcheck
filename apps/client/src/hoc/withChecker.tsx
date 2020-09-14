import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { TopicOutputType } from "../../sttr_build/types";
import { Topic, topics } from "../config";
import { autofillMap, autofillResolvers } from "../config/autofill";
import { sections } from "../config/matomo";
import { CheckerContext, SessionContext, SessionDataType } from "../context";
import ErrorPage from "../pages/ErrorPage";
import LoadingPage from "../pages/LoadingPage";
import RedirectPage from "../pages/RedirectPage";
import getChecker from "../sttr_client";
import topicsJson from "../topics.json";

export default (Component: any) => () => {
  const sessionContext = useContext(SessionContext) as SessionDataType;
  const checkerContext = useContext(CheckerContext);
  const [checker, setChecker] = useState(checkerContext.checker);
  const [error, setError] = useState();
  const { slug } = useParams();

  const topic = topics.find((t) => t.slug === slug);

  useEffect(() => {
    // Default settings to be able to open the CheckerPage
    if (!sessionContext[slug]) {
      sessionContext.setSessionData([
        slug,
        { activeComponents: [sections.LOCATION_INPUT], finishedComponents: [] },
      ]);
    }
  });
  useEffect(() => {
    initChecker();
  });

  const initChecker = async () => {
    // if the topic is not found (dynamic sttr-checker) or the topic is found and has an sttr flow
    if (!checker && !error && (!topic || topic.hasSTTR)) {
      try {
        const topicConfig = topicsJson
          .flat()
          .find((topic) => topic.slug === slug) as TopicOutputType;

        console.log({ topicConfig });
        const topicRequest = await fetch(
          `${window.location.origin}/${topicConfig.path}`
        );

        const newChecker = getChecker(await topicRequest.json());
        const address = sessionContext[slug]?.address;

        // Find if we have missing data needs
        if (address) {
          newChecker.autofill(autofillResolvers, { address });
        }

        const unfulfilledDataNeed = newChecker.getAutofillDataNeeds(
          autofillMap,
          true
        )[0];

        // Restore available answers from previous session. If we have
        // an unfulfilled dataNeed we don't restore the answers to
        // prevent issues with older sessions.
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

  if (checkerContext.topic && checkerContext.topic.slug !== slug) {
    // slug changed reset the topic and checker on sessioncontext
    checkerContext.topic = null;
    checkerContext.checker = null;
    return resetChecker();
  }

  // In case of error return the ErrorPage, eg. json not found
  if (error) {
    console.error(error);
    return <ErrorPage {...{ error }} />;
  }

  // Redirect to olo if needed
  if (topic?.redirectToOlo) {
    return <RedirectPage {...{ topic }} />;
  }

  // Use olo-flow if it's not an sttr-topic
  if (topic?.hasSTTR === false) {
    return <Component {...{ topic }} />;
  }

  // if checker is not initialized then we're still waiting for the json
  if (!checker) {
    return <LoadingPage />;
  }

  // We have the configured checker
  if (topic) {
    // This is a configured topic, the most common type
    checkerContext.topic = topic;
    return <Component {...{ topic, checker, resetChecker }} />;
  }

  /**
   * Fallback scenario;
   * We don't have a configured topic for the current slug.
   * Setup a 'fake' topic configuration and render the page.
   */
  const name =
    checker.permits.length === 1
      ? checker.permits[0].name
      : "Unconfigured checker with multiple permits";

  const dynamicTopic: Topic = {
    slug,
    name,
    hasSTTR: true,
    text: {
      heading: name,
    },
  };

  checkerContext.topic = dynamicTopic;
  return <Component {...{ topic: dynamicTopic, checker, resetChecker }} />;
};
