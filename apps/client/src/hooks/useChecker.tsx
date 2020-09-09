import { useContext, useEffect, useState } from "react";

import { Topic } from "../config";
import { autofillMap, autofillResolvers } from "../config/autofill";
import { CheckerContext, SessionContext, SessionDataType } from "../context";
import getChecker from "../sttr_client";
import useTopic from "./useTopic";

const dir =
  process.env.REACT_APP_STTR_ENV === "production" ? "prod" : "staging";

export default () => {
  const sessionContext = useContext(SessionContext) as SessionDataType;
  const checkerContext = useContext(CheckerContext);
  const [checker, setChecker] = useState(checkerContext.checker);
  const topic = useTopic();

  useEffect(() => {
    async function fetchData() {
      const { slug, sttrFile } = topic as Topic;
      const topicRequest = await fetch(
        `${window.location.origin}/sttr/${dir}/${sttrFile}`
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

    if (topic?.sttrFile && !checker) {
      fetchData();
    }
  });

  return checker;
};
