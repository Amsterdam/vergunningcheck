import React, { useCallback, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";

import { HideForPrint } from "../atoms";
import Conclusion from "../components/Conclusion";
import DebugDecisionTable from "../components/DebugDecisionTable";
import Layout from "../components/Layouts/DefaultLayout";
import LocationInput from "../components/Location/LocationInput";
import LocationResult from "../components/Location/LocationResult";
import PrintDetails from "../components/PrintDetails";
import Questions from "../components/Questions";
import RegisterLookupSummary from "../components/RegisterLookupSummary";
import {
  StepByStepItem,
  StepByStepNavigation,
} from "../components/StepByStepNavigation";
import { actions, eventNames, sections } from "../config/matomo";
import { SessionContext } from "../context";
import withChecker from "../hoc/withChecker";
import withTracking from "../hoc/withTracking";
import { geturl, routes } from "../routes";
import LoadingPage from "./LoadingPage";

const CheckerPage = ({ checker, matomoTrackEvent, resetChecker, topic }) => {
  const sessionContext = useContext(SessionContext);
  const { hasIMTR, slug, text } = topic;
  // OLO Flow does not have questionIndex
  const { questionIndex } = hasIMTR ? sessionContext[topic.slug] : 0;
  const { activeComponents, answers, finishedComponents } = sessionContext[
    slug
  ];

  useEffect(() => {
    // In case no active sections are found, reset the checker
    // This is a fallback to prevent users being stuck without any active component
    const activeComponent = [
      sections.CONCLUSION,
      sections.LOCATION_INPUT,
      sections.QUESTIONS,
    ].find((section) => isActive(section));

    if (!activeComponent) {
      console.warn("Resetting checker, because no active section was found");

      sessionContext.setSessionData([
        slug,
        {
          activeComponents: [sections.LOCATION_INPUT],
          answers: null,
          finishedComponents: [],
          questionIndex: null,
        },
      ]);

      if (hasIMTR) {
        resetChecker();
      }
    }

    // Prevent linter to add all dependencies, now the useEffect is only called on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isActive = useCallback(
    (component, finished = false) => {
      // If component is only a string, we make it a array first
      const allComponents = Array.isArray(component) ? component : [component];

      // If finished is true we check if it's finished, else check activeComponents.
      const components = finished ? finishedComponents : activeComponents;
      return components.includes(...allComponents);
    },
    [activeComponents, finishedComponents]
  );

  // Redirect to Intro in case no session context has been found
  if (!sessionContext[slug]) {
    window.location.href = geturl(routes.intro, { slug });
    return <LoadingPage />;
  }

  // Only one component can be active at the same time.
  const setActiveState = (component) => {
    // Do not track the active step
    if (!isActive(component)) {
      matomoTrackEvent({
        action: actions.ACTIVE_STEP,
        name: component,
      });
    }

    sessionContext.setSessionData([slug, { activeComponents: [component] }]);
  };

  /**
   * Set given components to the given finished state
   *
   * @param { Object[] | string } component - name or names of the components
   * @param { boolean } value - Set components to finished state or remove from finished state.
   */
  const setFinishedState = (component, value) => {
    // If component is only a string, we make it a array first
    const allComponents = Array.isArray(component) ? component : [component];

    // If value is false, remove the components from the fishedComponents array
    const newFinishedComponents =
      typeof value === "boolean" && value === false
        ? finishedComponents?.filter((c) => !allComponents.includes(c)) || []
        : [...finishedComponents, ...allComponents];

    // Save the new array to the context
    sessionContext.setSessionData([
      slug,
      { finishedComponents: newFinishedComponents },
    ]);
  };

  const isFinished = (component) => isActive(component, true);

  /**
   * Set the questionIndex the next questionId, previous questionId, or the given id.
   *
   * @param { int | ('next'|'prev') } value - This van be, 'next, prev or a int`
   */
  const goToQuestion = (value) => {
    let action, eventName, newQuestionIndex;

    if (Number.isInteger(value)) {
      // Edit specific question index (value), go directly to this new question index
      newQuestionIndex = value;
      // Matomo event props
      action = actions.EDIT_QUESTION;
      eventName = checker.stack[newQuestionIndex].text;
    } else if (value === "next" || value === "prev") {
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
      // @TODO: Fix this by converting this file to typescript
      console.error(
        `goToQuestion(): ${value} is not an integer, 'next' or 'prev'`
      );
      return;
    }

    matomoTrackEvent({
      action,
      name: eventName,
    });

    sessionContext.setSessionData([
      slug,
      {
        questionIndex: newQuestionIndex,
      },
    ]);
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

  return (
    <Layout heading={text.heading}>
      <Helmet>
        <title>Vragen en conclusie - {text.heading}</title>
      </Helmet>

      <PrintDetails />

      {/* IMTR-flow with the StepByStepNavigation */}
      {hasIMTR && (
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
            {/* @TODO: Refactor this, because of duplicate code */}
            {isActive(sections.LOCATION_INPUT) && (
              <LocationInput
                {...{
                  isFinished,
                  matomoTrackEvent,
                  resetChecker,
                  setActiveState,
                  setFinishedState,
                  topic,
                }}
              />
            )}
            {!isActive(sections.LOCATION_INPUT) && (
              <RegisterLookupSummary
                {...{
                  matomoTrackEvent,
                  setActiveState,
                  topic,
                }}
              />
            )}
          </StepByStepItem>
          <StepByStepItem
            active={isActive(sections.QUESTIONS) && questionIndex === 0}
            checked={isFinished(sections.QUESTIONS)}
            customSize
            done={answers || isActive(sections.QUESTIONS)}
            heading="Vragen"
            largeCircle
            // Overwrite the line between the Items
            style={checkedStyle}
          />
          <Questions
            {...{
              checker,
              goToQuestion,
              isActive,
              isFinished,
              matomoTrackEvent,
              setActiveState,
              setFinishedState,
              topic,
            }}
          />
          <StepByStepItem
            active={isActive(sections.CONCLUSION)}
            as="div"
            checked={isFinished(sections.QUESTIONS)}
            done={isFinished(sections.QUESTIONS)}
            customSize
            heading="Conclusie"
            largeCircle
            onClick={handleConclusionClick}
            // Overwrite the line between the Items
            style={{ marginTop: -1 }}
          >
            {isFinished(sections.QUESTIONS) && (
              <Conclusion {...{ checker, matomoTrackEvent }} />
            )}
          </StepByStepItem>
        </StepByStepNavigation>
      )}

      {/* OLO-flow only needs the Location component */}
      {!hasIMTR && (
        <>
          {/* @TODO: Refactor this, because of duplicate code */}
          {isActive(sections.LOCATION_INPUT) && (
            <LocationInput
              {...{
                matomoTrackEvent,
                isFinished,
                setActiveState,
                setFinishedState,
                topic,
              }}
            />
          )}
          {isActive(sections.LOCATION_RESULT) && (
            <LocationResult
              {...{
                isActive,
                isFinished,
                matomoTrackEvent,
                setActiveState,
                setFinishedState,
                topic,
              }}
            />
          )}
        </>
      )}

      <HideForPrint>
        <DebugDecisionTable {...{ checker, topic }} />
      </HideForPrint>
    </Layout>
  );
};
export default withChecker(withTracking(CheckerPage));
