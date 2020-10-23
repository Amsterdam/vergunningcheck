import getChecker from "imtr_client";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { Topic } from "../config";
import { autofillResolvers } from "../config/autofill";
import { sections } from "../config/matomo";
import { CheckerContext, SessionContext, SessionDataType } from "../context";
import ErrorPage from "../pages/ErrorPage";
import LoadingPage from "../pages/LoadingPage";
import RedirectPage from "../pages/RedirectPage";
import topicsJson from "../topics.json";
import { findTopicBySlug } from "../utils";

// TopicOutputType should come from shared types.ts from imtr-lib in the future
export type TopicOutputType = {
  permits: string[];
  slug: string;
  path: string;
  name?: string;
};

type Props = {
  matomoTrackEvent: any;
  matomoPageView: any;
};

export default (Component: any) => (props: Props) => {
  const sessionContext = useContext(SessionContext) as SessionDataType;
  const checkerContext = useContext(CheckerContext);
  const [checker, setChecker] = useState(checkerContext.checker);
  const [error, setError] = useState();
  const { slug } = useParams<{ slug: string }>();
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const topic = findTopicBySlug(slug);

  useEffect(() => {
    if (sessionContext[slug]) {
      initChecker();
    }
  });

  const initChecker = async () => {
    // if the topic is not found (dynamic IMTR-checker) or the topic is found and has an imtr flow
    if (!checker && !error && (!topic || topic.hasIMTR)) {
      try {
        const topicConfig = topicsJson
          .flat()
          .find((topic) => topic.slug === slug) as TopicOutputType;

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
          autofillResolvers,
          true
        )[0];

        // Restore available answers from previous session. If we have
        // an unfulfilled dataNeed we don't restore the answers to
        // prevent issues with older sessions.
        const answers = sessionContext[slug]?.answers;
        if (answers && !unfulfilledDataNeed) {
          newChecker.setQuestionAnswers(answers);
        }

        // Store the entire `imtr-checker` in React Context
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

  if (params.get("loadChecker")) {
    // @TODO: we need to replace this `loadChecker` URL with a decent solution
    checkerContext.checker = null;

    // Reset all but address from session
    sessionContext.setSessionData([
      slug,
      {
        answers: null,
        questionIndex: 0,
      },
    ]);
  }

  // Default settings to be able to open the CheckerPage
  if (!sessionContext[slug]) {
    sessionContext.setSessionData([
      slug,
      { activeComponents: [sections.LOCATION_INPUT], finishedComponents: [] },
    ]);
  }

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

  // Use olo-flow if it's not an imtr-topic
  if (topic?.hasIMTR === false) {
    return <Component {...{ topic, ...props }} />;
  }

  // if checker is not initialized then we're still waiting for the json
  if (!checker) {
    return <LoadingPage />;
  }

  // We have the configured checker
  if (topic) {
    // This is a configured topic, the most common type
    checkerContext.topic = topic;
    return <Component {...{ topic, checker, resetChecker, ...props }} />;
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
    hasIMTR: true,
    text: {
      heading: name,
    },
  };

  checkerContext.topic = dynamicTopic;
  return (
    <Component {...{ topic: dynamicTopic, checker, resetChecker, ...props }} />
  );
};
