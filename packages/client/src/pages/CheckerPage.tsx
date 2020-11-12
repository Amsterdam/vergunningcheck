import React, { useCallback, useEffect } from "react";
import { Helmet } from "react-helmet";

import { HideForPrint } from "../atoms";
import { Conclusion } from "../components/Conclusion";
import { TopicLayout } from "../components/Layouts";
import { LocationInput, LocationSummary } from "../components/Location";
import PrintDetails from "../components/PrintDetails";
import Questions, { GoToQuestionProp } from "../components/Questions";
import {
  StepByStepItem,
  StepByStepNavigation,
} from "../components/StepByStepNavigation";
import { actions, eventNames, sections } from "../config/matomo";
import { DebugDecisionTable } from "../debug";
import { useChecker, useTopic, useTopicData, useTracking } from "../hooks";
import { isEmptyObject } from "../utils";
import LoadingPage from "./LoadingPage";

const CheckerPage = () => {
  const { topicData, setTopicData } = useTopicData();
  const { checker } = useChecker();
  const topic = useTopic();
  const { matomoTrackEvent } = useTracking();

  const { hasIMTR, text } = topic;

  useEffect(() => {
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
    // If component is only a string, we make it a array first
    const allComponents = Array.isArray(component) ? component : [component];

    // If value is false, remove the components from the fishedComponents array
    const newFinishedComponents: string[] =
      typeof value === "boolean" && value === false
        ? finishedComponents?.filter(
            (c: string) => !allComponents.includes(c)
          ) || []
        : [...finishedComponents, ...allComponents];

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
  };

  return (
    <TopicLayout>
      <Helmet>
        <title>Vragen en uitkomst - {text.heading}</title>
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
          done={!isEmptyObject(answers) || isActive(sections.QUESTIONS)}
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
          as="div"
          done={isFinished(sections.QUESTIONS)}
          customSize
          heading="Uitkomst"
          largeCircle
          onClick={handleConclusionClick}
          // Overwrite the line between the Items
          style={{ marginTop: -1 }}
        >
          {isFinished(sections.QUESTIONS) && <Conclusion />}
        </StepByStepItem>
      </StepByStepNavigation>

      <HideForPrint>
        <DebugDecisionTable />
      </HideForPrint>
    </TopicLayout>
  );
};
export default CheckerPage;