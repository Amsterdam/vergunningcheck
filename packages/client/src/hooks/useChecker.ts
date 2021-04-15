import { Checker, getChecker } from "@vergunningcheck/imtr-client";
import { useContext, useEffect, useState } from "react";

import { CheckerContext } from "../CheckerContext";
import { autofillResolvers } from "../config/autofill";
import { useTopic, useTopicData } from "./";

export default () => {
  const checkerContext = useContext(CheckerContext);
  const [checker, setChecker] = useState(checkerContext.checker);
  const [error, setError] = useState();
  const topic = useTopic();

  if (!topic)
    return {
      checker,
      setChecker: (checker: Checker | undefined) => {
        checkerContext.setChecker(checker);
      },
    };

  const { topicData } = useTopicData();

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
        const topicRequest = await fetch(
          `${window.location.origin}/imtr/transformed/${topic.slug}`
        );
        const newChecker = getChecker(await topicRequest.json());
        const { address, answers } = topicData;

        // Find if we have missing data needs
        if (address) {
          newChecker.autofill(autofillResolvers, { address });

          // Load the first question
          if (newChecker.stack.length === 0) {
            newChecker.next();
          }
        }

        const unfulfilledDataNeed = newChecker.getAutofillDataNeeds(
          autofillResolvers,
          true
        )[0];

        // Restore available answers from previous session. If we have
        // an unfulfilled dataNeed we don't restore the answers to
        // prevent issues with older sessions.
        if (!unfulfilledDataNeed) {
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
