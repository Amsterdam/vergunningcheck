import { useContext, useEffect } from "react";

import { CheckerContext, setCheckerFn } from "../CheckerContext";
import { Topic } from "../config";
import { autofillMap, autofillResolvers } from "../config/autofill";
import getChecker from "../sttr_client";
import Checker from "../sttr_client/models/checker";
import useTopic from "./useTopic";
import useTopicSession from "./useTopicSession";

const dir =
  process.env.REACT_APP_STTR_ENV === "production" ? "prod" : "staging";

export default () => {
  const topic = useTopic();
  const { topicData } = useTopicSession();
  const { checker, setChecker } = useContext(CheckerContext);

  if (topic === undefined) {
    throw new Error("Topic not found");
  }

  useEffect(() => {
    async function fetchData() {
      const { sttrFile } = topic as Topic;
      const topicRequest = await fetch(
        `${window.location.origin}/sttr/${dir}/${sttrFile}`
      );

      const newChecker = getChecker(await topicRequest.json());
      const { address } = topicData;

      // Find if we have missing data needs
      if (address) {
        newChecker.autofill(autofillResolvers, { address });
      }

      const unfulfilledDataNeed = newChecker.getAutofillDataNeeds(
        autofillMap,
        true
      )[0];

      // TODO: Add comment about the next if
      if (topicData.answers && !unfulfilledDataNeed) {
        newChecker.setQuestionAnswers(topicData.answers);
      }

      // Store the Checker in React Context
      setChecker(newChecker);
    }

    if (topic?.sttrFile && !checker) {
      fetchData();
    }
  });

  return [checker, setChecker] as [Checker, setCheckerFn];
};
