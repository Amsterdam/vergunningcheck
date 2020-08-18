import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { TopicOutputType } from "../../sttr_build/types";
import { Topic, topics } from "../config";
import { autofillMap, autofillResolvers } from "../config/autofill";
import { CheckerContext, SessionContext, SessionDataType } from "../context";
import ErrorPage from "../pages/ErrorPage";
import LoadingPage from "../pages/LoadingPage";
import RedirectPage from "../pages/RedirectPage";
import getChecker from "../sttr_client";

export default (Component: any) => {
  return () => {
    const sessionContext = useContext(SessionContext) as SessionDataType;
    const checkerContext = useContext(CheckerContext);
    const [checker, setChecker] = useState(checkerContext.checker);
    const [error, setError] = useState();
    const { slug } = useParams();

    const address = sessionContext[slug]?.address;
    const topic = topics.find((t) => t.slug === slug);

    useEffect(() => {
      // if the topic is not found (dynamic sttr-checker) or the topic is found and has an sttr flow
      if (!topic || topic.hasSTTR) {
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
          const topicsJson = await topicsRequest.json();

          const topicConfig = topicsJson
            .flat()
            .find((topic: TopicOutputType) => topic.slug === slug);

          const topicRequest = await fetch(
            `${window.location.origin}/${topicConfig.path}.json`
          );

          const newChecker = getChecker(await topicRequest.json());

          // Find if we have missing data needs
          if (address) {
            newChecker.autofill(autofillResolvers, { address });
          }

          const unfulfilledDataNeed = newChecker.getAutofillDataNeeds(
            autofillMap,
            true
          )[0];

          // TODO: Add comment about the next if
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

    // In case of error return the ErrorPage, eg. json not found
    if (error) {
      console.error(error);
      return <ErrorPage {...{ error }} />;
    }

    // Setup the olo + redirectToOlo flow
    if (topic) {
      // Redirect to olo if needed
      if (topic.redirectToOlo) {
        return <RedirectPage {...{ topic }} />;
      }

      // Use olo-flow if it's not an sttr-topic
      if (!topic.hasSTTR) {
        return (
          <Component {...{ topic, checker: null /* XXX */, resetChecker }} />
        );
      }
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
};
