import { Checker, getChecker } from "@vergunningcheck/imtr-client";
import { useContext, useEffect, useState } from "react";

import { CheckerContext } from "../CheckerContext";
import { autofillResolvers } from "../config/autofill";
import topicsJson from "../topics.json";
import useTopicData from "./useTopicData";
import { useTopic } from ".";

export default () => {
  const { topicData } = useTopicData();
  const checkerContext = useContext(CheckerContext);
  const [checker, setChecker] = useState(checkerContext.checker);
  const [error, setError] = useState();
  const topic = useTopic();

  useEffect(() => {
    // Initilize the checker on first load, reload and on reset
    if (!checker && !checkerContext.checker) {
      initChecker();
    }
    // Force clearing the checker when the checker has been reset on the context
    if (checker && !checkerContext.checker) {
      setChecker(undefined);
    }
    //eslint-disable-next-line
  }, [checker, checkerContext]);

  const initChecker = async () => {
    // if the topic is not found (dynamic IMTR-checker) or the topic is found and has an imtr flow
    const loadChecker = !checker && !error && (!topic || topic.hasIMTR);
    if (loadChecker) {
      try {
        const topicConfig = topicsJson
          .flat()
          .find((t) => t.slug === topic.slug) as {
          path: string;
        };

        const topicRequest = await fetch(
          `${window.location.origin}/${topicConfig.path}`
        );
        const newChecker = getChecker(await topicRequest.json());
        const address = topicData.address;

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
        const answers = topicData.answers;
        if (answers && !unfulfilledDataNeed) {
          newChecker.setQuestionAnswers(answers);
        }

        // Store the entire `imtr-checker` in React Context
        checkerContext.setChecker(newChecker);
        setChecker(newChecker);
      } catch (e) {
        console.error(e);
        setError(e);
      }
    }
  };

  return {
    checker,
    setChecker: (checker: Checker | undefined) => {
      checkerContext.setChecker(checker);
    },
  };
};
