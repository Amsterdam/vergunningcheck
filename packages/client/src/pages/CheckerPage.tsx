import { captureException } from "@sentry/browser";
import React, { useCallback, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";

import { HideForPrint } from "../atoms";
import { TopicLayout } from "../components/Layouts";
import { LocationInput, LocationSummary } from "../components/Location";
import { OutcomeSection } from "../components/Outcome";
import PrintDetails from "../components/PrintDetails";
import {
  GoToQuestionProp,
  QuestionsOriginal as Questions,
} from "../components/Question";
import {
  StepByStepItem,
  StepByStepNavigation,
} from "../components/StepByStepNavigation";
import { autofillResolvers, getDataNeed } from "../config/autofill";
import { actions, eventNames, sections } from "../config/matomo";
import { DebugDecisionTable } from "../debug";
import {
  useChecker,
  useSlug,
  useTopic,
  useTopicData,
  useTracking,
} from "../hooks";
import { SessionContext, defaultTopicSession } from "../SessionContext";
import { Address } from "../types";
import { isEmptyObject } from "../utils";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";

const CheckerPage = () => {
  const { topicData, setTopicData } = useTopicData();
  const { checker } = useChecker();
  const { text } = useTopic();
  const slug = useSlug();
  const { matomoTrackEvent } = useTracking();
  const sessionContext = useContext(SessionContext);

  const hasDataNeeds = !!getDataNeed(checker);

  const {
    activeComponents,
    address,
    answers,
    questionIndex = 0,
    finishedComponents = [],
  } = topicData || {};

  useEffect(() => {
    // In case no active sections are found, reset the checker
    // This is a fallback to prevent users being stuck without any active component
    const activeComponent = [
      sections.OUTCOME,
      sections.LOCATION_INPUT,
      sections.QUESTIONS,
    ].find((section) => isActive(section));

    if (!activeComponent) {
      console.error("Resetting checker, because no active section was found");
      setTopicData(defaultTopicSession);
    }

    // Prevent linter to add all dependencies, now the useEffect is only called on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    setTopicData({ activeComponents: [component] });
  };

  useEffect(() => {
    // Checker is initialized but there are no active components yet
    if (checker && (!activeComponents || !activeComponents.length)) {
      const activeStep = hasDataNeeds
        ? sections.LOCATION_INPUT
        : sections.QUESTIONS;

      matomoTrackEvent({
        action: actions.ACTIVE_STEP,
        name: activeStep,
      });

      setActiveState(activeStep);
      setTopicData({ finishedComponents: [] });
    }

    // Prevent bug when manually erasing data Session Storage
    if (hasDataNeeds && !address && !isActive(sections.LOCATION_INPUT)) {
      setTopicData(defaultTopicSession);
      setActiveState(sections.LOCATION_INPUT);
    }

    // Prevent linter to add all dependencies, now the useEffect is only called on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeComponents, checker, hasDataNeeds]);

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

  // In case `topicData` is not found on the Session Context display an error
  // This is to prevent a bug when `topicData` is passing old data or when the Session Storage is manually deleted
  if (!sessionContext.session[slug]) {
    return <ErrorPage />;
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

      if (!checker.stack[newQuestionIndex]) {
        captureException(
          `Go to question, question with index: ${newQuestionIndex} not found on stack`
        );
        return;
      }

      // Matomo event props
      action = checker.stack[questionIndex].text;
      eventName =
        value === "next"
          ? eventNames.GOTO_NEXT_QUESTION
          : eventNames.GOTO_PREV_QUESTION;
    } else {
      // Edit specific question index (value), go directly to this new question index
      newQuestionIndex = value;

      if (!checker.stack[newQuestionIndex]) {
        captureException(
          `Go to question, question with index: ${newQuestionIndex} not found on stack`
        );
        return;
      }

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

  // Callback to go to the Outcome section
  // `false` is to prevent unexpected click, hover and focus states on already active section
  const handleOutcomeClick =
    !isActive(sections.OUTCOME) && isFinished(sections.QUESTIONS)
      ? () => setActiveState(sections.OUTCOME)
      : false;

  const checkedStyle = {
    borderColor: "white",
  };

  // On LocationSubmit
  const handleNewAddressSubmit = (address: Address) => {
    setTopicData({
      activeComponents: [sections.QUESTIONS],
      finishedComponents: [sections.LOCATION_INPUT],
      address,
    });

    // Autofill `checker` when `address` is submitted
    checker.autofill(autofillResolvers, { address });
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
        {hasDataNeeds ? (
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
            {hasDataNeeds && isActive(sections.LOCATION_INPUT) && (
              <LocationInput
                {...{
                  handleNewAddressSubmit,
                }}
              />
            )}
            {hasDataNeeds && !isActive(sections.LOCATION_INPUT) && (
              <LocationSummary showEditLocationModal />
            )}
          </StepByStepItem>
        ) : (
          <span />
        )}
        <StepByStepItem
          active={isActive(sections.QUESTIONS) && questionIndex === 0}
          checked={isFinished(sections.QUESTIONS)}
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
          active={isActive(sections.OUTCOME)}
          checked={isFinished(sections.QUESTIONS)}
          as="div"
          done={isFinished(sections.QUESTIONS)}
          customSize
          heading="Uitkomst"
          largeCircle
          onClick={handleOutcomeClick}
          // Overwrite the line between the Items
          style={{ marginTop: -1 }}
        >
          {isFinished(sections.QUESTIONS) && <OutcomeSection />}
        </StepByStepItem>
      </StepByStepNavigation>

      <HideForPrint>
        <DebugDecisionTable />
      </HideForPrint>
    </TopicLayout>
  );
};
export default CheckerPage;
