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

    // if a configured topic is found...
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

      // This is a configured topic, the most common type
      checkerContext.topic = topic;
      return <Component {...{ topic, checker, resetChecker }} />;
    }

    // if checker is not available then we are still loading the json
    if (!checker) {
      return <LoadingPage />;
    }

    /** We don't have a configured topic for the current slug.
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
      intro: "shared/DefaultIntro",
    };
    checkerContext.topic = dynamicTopic;
    return <Component {...{ topic: dynamicTopic, checker, resetChecker }} />;
  };
};
