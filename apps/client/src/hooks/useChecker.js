import { useContext, useEffect, useState } from "react";

import { autofillMap, autofillResolvers } from "../config/autofill";
import { CheckerContext, SessionContext } from "../context";
import getChecker from "../sttr_client";
import useTopic from "./useTopic";

export default () => {
  const sessionContext = useContext(SessionContext);
  const checkerContext = useContext(CheckerContext);
  const [checker, setChecker] = useState(checkerContext.checker);
  const topic = useTopic();
  const { slug } = topic;

  useEffect(() => {
    async function fetchData() {
      const topicRequest = await fetch(
        `${window.location.origin}/${topic.sttrFile}.json`
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

      // TODO: Add comment about the next if
      if (sessionContext[slug]?.answers && !unfulfilledDataNeed) {
        newChecker.setQuestionAnswers(sessionContext[slug].answers);
      }

      // Store the entire `sttr-checker` in React Context
      checkerContext.checker = newChecker;
      setChecker(newChecker);
    }
    fetchData();
  });

  return checker;
};
