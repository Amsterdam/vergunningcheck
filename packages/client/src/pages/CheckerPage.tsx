import React, { useCallback, useEffect } from "react";
import { Helmet } from "react-helmet";

import { HideForPrint } from "../atoms";
import Conclusion from "../components/Conclusion";
import Layout from "../components/Layouts/TopicLayout";
import { LocationInput, LocationSummary } from "../components/Location";
import PrintDetails from "../components/PrintDetails";
import Questions, { GoToQuestionProp } from "../components/Questions";
import {
  StepByStepItem,
  StepByStepNavigation,
} from "../components/StepByStepNavigation";
import { actions, eventNames, sections } from "../config/matomo";
import DebugDecisionTable from "../debug/DebugDecisionTable";
import { useChecker, useTopic, useTracking } from "../hooks";
import { useTopicData } from "../hooks";
import { isEmtpyObject } from "../utils";
import LoadingPage from "./LoadingPage";

const CheckerPage = () => {
  const { topicData, setTopicData } = useTopicData();
  const { checker } = useChecker();
  const topic = useTopic();
  const { matomoTrackEvent } = useTracking();

  const { hasIMTR, text } = topic;

  // const resetChecker = () => {
  //   setChecker(undefined);
  // };

  useEffect(() => {
    // In case no active sections are found, reset the checker
    // This is a fallback to prevent users being stuck without any active component
    // const activeComponent = [
    //   sections.CONCLUSION,
    //   sections.LOCATION_INPUT,
    //   sections.LOCATION_RESULT,
    //   sections.QUESTIONS,
    // ].find((section) => isActive(section));

    // if (!activeComponent) {
    //   console.warn("Resetting checker, because no active section was found");

    //   setTopicData({
    //     activeComponents: [sections.LOCATION_INPUT],
    //     answers: {},
    //     finishedComponents: [],
    //     questionIndex: 0,
    //   });

    //   if (hasIMTR) {
    //     resetChecker();
    //   }
    // }

    // Make the app backwards compatible:

    // LOCATION_RESULT does not exist anymore in the IMTR flow
    const isOldSectionActive = hasIMTR && isActive(sections.LOCATION_RESULT);
    const isOldSectionFinished =
      hasIMTR && isFinished(sections.LOCATION_RESULT);

    if (isOldSectionActive || isOldSectionFinished) {
      // Reset LOCATION_INPUT to active component in case LOCATION_RESULT is active
      const newActiveComponents = isOldSectionActive
        ? [sections.LOCATION_INPUT]
        : activeComponents;

      // Remove LOCATION_RESULT from the finished components and replace with LOCATION_INPUT
      const newFinishedComponents = finishedComponents.filter(
        (section) => section !== sections.LOCATION_RESULT
      );
      newFinishedComponents.push(sections.LOCATION_INPUT);

      console.warn(
        "Resetting components, because an old section was found active"
      );

      // Remove old sections from existing local storage data and set active component to Location Input
      setTopicData({
        activeComponents: newActiveComponents,
        finishedComponents: newFinishedComponents,
      });
    }

    // Prevent linter to add all dependencies, now the useEffect is only called on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    activeComponents,
    answers,
    questionIndex = 0,
    finishedComponents = [],
  } = topicData || {};

  const isActive = useCallback(
    (component: string[] | string, finished: boolean = false) => {
      // If component is only a string, we make it a array first
      const allComponents = Array.isArray(component) ? component : [component];

      // If finished is true we check if it's finished, else check activeComponents.
      const components = finished
        ? finishedComponents
        : activeComponents
        ? activeComponents
        : [];
      return components.includes(allComponents[0]);
    },
    [activeComponents, finishedComponents]
  );

  // if (!topicData) {
  //   setTopicData(defaultTopicSession);
  //   return null;
  // }

  // Only one component can be active at the same time.
  const setActiveState = (component: string) => {
    // Do not track the active step
    if (!isActive(component)) {
      matomoTrackEvent({
        action: actions.ACTIVE_STEP,
        name: component,
      });
    }

    // sessionContext[slug].activeComponents = [component];
    setTopicData({ activeComponents: [component] });
  };

  /**
   * Set given components to the given finished state
   *
   * @param component - name or names of the components
   * @param value - Set components to finished state or remove from finished state.
   */
  const setFinishedState = (component: string[] | string, value: boolean) => {
    console.log("setFinished", component, value);
    // If component is only a string, we make it a array first
    const allComponents = Array.isArray(component) ? component : [component];

    // If value is false, remove the components from the fishedComponents array
    const newFinishedComponents: string[] =
      typeof value === "boolean" && value === false
        ? finishedComponents?.filter(
            (c: string) => !allComponents.includes(c)
          ) || []
        : [...finishedComponents, ...allComponents];

    // Save the new array to the context
    // sessionContext[slug].finishedComponents = newFinishedComponents;

    console.log("setFinished", newFinishedComponents);
    setTopicData({ finishedComponents: newFinishedComponents });
  };

  const isFinished = (component: string[] | string) =>
    isActive(component, true);

  if (!checker) {
    return <LoadingPage />;
  }

  /**
   * Set the questionIndex the next questionId, previous questionId, or the given id.
   */
  const goToQuestion = (value: GoToQuestionProp) => {
    let action, eventName;
    let newQuestionIndex: number;

    if (value === "next" || value === "prev") {
      // Either go 1 question next or prev
      newQuestionIndex =
        value === "next" ? questionIndex + 1 : questionIndex - 1;
      // Matomo event props
      action = checker.stack[questionIndex].text;
      eventName =
        value === "next"
          ? eventNames.GOTO_NEXT_QUESTION
          : eventNames.GOTO_PREV_QUESTION;
    } else {
      // Edit specific question index (value), go directly to this new question index
      newQuestionIndex = value;
      // Matomo event props
      action = actions.EDIT_QUESTION;
      eventName = (checker.stack[newQuestionIndex] as any).text;
    }

    matomoTrackEvent({
      action,
      name: eventName,
    });

    setTopicData({
      questionIndex: newQuestionIndex,
    });
  };

  // Callback to go to the Conclusion section
  // `false` is to prevent unexpected click, hover and focus states on already active section
  const handleConclusionClick =
    !isActive(sections.CONCLUSION) && isFinished(sections.QUESTIONS)
      ? () => setActiveState(sections.CONCLUSION)
      : false;

  const checkedStyle = {
    borderColor: "white",
  };

  // On LocationSubmit
  const handleNewAddressSubmit = (address: any) => {
    setTopicData({
      activeComponents: [
        hasIMTR ? sections.QUESTIONS : sections.LOCATION_RESULT,
      ],
      finishedComponents: [sections.LOCATION_INPUT],
      address,
    });
    // Reset old values
    // resetChecker();
    // setFinishedState([sections.QUESTIONS, sections.CONCLUSION], false);

    // // Reset the answers and questionIndex to start clean
    // // setTopicData({
    // //   answers: {},
    // //   questionIndex: 0, // Reset to 0 to start with the first question
    // // });

    // setFinishedState(sections.LOCATION_INPUT, true);
    // setActiveState(hasIMTR ? sections.QUESTIONS : sections.LOCATION_RESULT);
  };

  return (
    <Layout>
      <Helmet>
        <title>Vragen en conclusie - {text.heading}</title>
      </Helmet>

      <PrintDetails />
      <StepByStepNavigation
        customSize
        disabledTextColor="inherit"
        doneTextColor="inherit"
        highlightActive
        lineBetweenItems
      >
        <StepByStepItem
          active={isActive(sections.LOCATION_INPUT)}
          checked={isFinished(sections.LOCATION_INPUT)}
          done={isActive(sections.LOCATION_INPUT)}
          heading="Adresgegevens"
          largeCircle
          // Overwrite the line between the Items
          style={
            isActive(sections.LOCATION_INPUT) || questionIndex === 0
              ? checkedStyle
              : {}
          }
        >
          {isActive(sections.LOCATION_INPUT) && (
            <LocationInput
              {...{
                handleNewAddressSubmit,
              }}
            />
          )}
          {!isActive(sections.LOCATION_INPUT) && (
            <LocationSummary showEditLocationModal />
          )}
        </StepByStepItem>
        <StepByStepItem
          active={isActive(sections.QUESTIONS) && questionIndex === 0}
          checked={isFinished(sections.QUESTIONS)}
          customSize
          done={!isEmtpyObject(answers) || isActive(sections.QUESTIONS)}
          heading="Vragen"
          largeCircle
          // Overwrite the line between the Items
          style={checkedStyle}
        />
        <Questions
          {...{
            goToQuestion,
            isActive,
            isFinished,
            setActiveState,
            setFinishedState,
          }}
        />
        <StepByStepItem
          active={isActive(sections.CONCLUSION)}
          checked={isFinished(sections.QUESTIONS)}
          // as="div" // XXX
          done={isFinished(sections.QUESTIONS)}
          customSize
          heading="Conclusie"
          largeCircle
          onClick={() => handleConclusionClick && handleConclusionClick()}
          // Overwrite the line between the Items
          style={{ marginTop: -1 }}
        >
          {isFinished(sections.QUESTIONS) && <Conclusion />}
        </StepByStepItem>
      </StepByStepNavigation>

      <HideForPrint>
        <DebugDecisionTable />
      </HideForPrint>
    </Layout>
  );
};
export default CheckerPage;

// import React from "react";

// import BaseLayout from "../components/Layouts/BaseLayout";
// import { useTopicData } from "../hooks";

// const CheckerPage2 = () => {
//   const { topicData, setTopicData } = useTopicData();
//   return (
//     <BaseLayout>
//       <code>
//         topicData:
//         <pre>{JSON.stringify(topicData)}</pre>
//       </code>
//       <button
//         onClick={() => {
//           setTopicData({ address: "blaat" });
//         }}
//       >
//         bla
//       </button>
//     </BaseLayout>
//   );
// };
// export default CheckerPage2;
