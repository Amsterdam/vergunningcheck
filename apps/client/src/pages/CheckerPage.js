import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";

import Conclusion from "../components/Conclusion";
import DebugDecisionTable from "../components/DebugDecisionTable";
import Layout from "../components/Layouts/DefaultLayout";
import LocationInput from "../components/Location/LocationInput";
import LocationResult from "../components/Location/LocationResult";
import PrintDetails from "../components/PrintDetails";
import Questions from "../components/Questions";
import {
  StepByStepItem,
  StepByStepNavigation,
} from "../components/StepByStepNavigation";
import { actions, eventNames, sections } from "../config/matomo";
import { SessionContext } from "../context";
import withChecker from "../hoc/withChecker";
import withTracking from "../hoc/withTracking";
import { geturl, routes } from "../routes";

const CheckerPage = ({ checker, matomoTrackEvent, resetChecker, topic }) => {
  const sessionContext = useContext(SessionContext);
  const { name, slug, sttrFile, text } = topic;

  // OLO Flow does not have questionIndex
  const { questionIndex } = sttrFile ? sessionContext[topic.slug] : 0;

  //@TODO: We shoudn't need this redirect. We need to refactor this
  if (!sessionContext[slug]) {
    return <Redirect to={geturl(routes.intro, topic)} />;
  }

  const { activeComponents, answers, finishedComponents } = sessionContext[
    slug
  ];

  // Only one component can be active at the same time.
  const setActiveState = (component) => {
    matomoTrackEvent({
      action: actions.STEP,
      category: name,
      name: component,
    });

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

  const isActive = (component, finished = false) => {
    // If component is only a string, we make it a array first
    const allComponents = Array.isArray(component) ? component : [component];

    // If finished is true we check if it's finished, else check activeComponents.
    const components = finished ? finishedComponents : activeComponents;
    return components.includes(...allComponents);
  };

  const isFinished = (component) => isActive(component, true);

  /**
   * Set the questionIndex the next questionId, previous questionId, or the given id.
   *
   * @param { int | ('next'|'prev') } value - This van be, 'next, prev or a int`
   */
  const goToQuestion = (value) => {
    const newIndex = Number.isInteger(value)
      ? value // Return the value if value isInteger()
      : value === "next"
      ? questionIndex + 1
      : value === "prev"
      ? questionIndex - 1
      : console.error(
          `goToQuestion(): ${value} is not an integer, 'next' or 'prev'`
        );
    const question = checker.stack[questionIndex];
    // EventName is the question text in lowercase combined with the button that is pressed. (next, prev)
    const eventName = `${
      Number.isInteger(value)
        ? eventNames.EDIT_QUESTION
        : value === "prev"
        ? eventNames.PREV_QUESTION
        : eventNames.NEXT_QUESTION
    } - ${question.text.toLowerCase()}`;

    matomoTrackEvent({
      action: actions.CLICK_INTERNAL_NAVIGATION,
      category: name,
      name: eventName,
    });

    sessionContext.setSessionData([
      slug,
      {
        questionIndex: newIndex,
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
    <Layout>
      <Helmet>
        <title>Vragen en conclusie - {text.heading}</title>
      </Helmet>

      <PrintDetails />

      {/* STTR-flow with the StepByStepNavigation */}
      {sttrFile && (
        <StepByStepNavigation
          customSize
          disabledTextColor="inherit"
          doneTextColor="inherit"
          highlightActive
          lineBetweenItems
        >
          <StepByStepItem
            active={
              isActive(sections.LOCATION_INPUT) ||
              isActive(sections.LOCATION_RESULT)
            }
            checked={
              isActive(sections.LOCATION_RESULT) ||
              isFinished(sections.LOCATION_RESULT)
            }
            done={
              isActive(sections.LOCATION_INPUT) ||
              isActive(sections.LOCATION_RESULT)
            }
            heading="Adresgegevens"
            largeCircle
            // Overwrite the line between the Items
            style={
              isActive(sections.LOCATION_INPUT) ||
              isActive(sections.LOCATION_RESULT) ||
              questionIndex === 0
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
            {/* @TODO: Refactor this, because of duplicate code */}
            {!isActive(sections.LOCATION_INPUT) &&
              (isActive(sections.LOCATION_RESULT) ||
                isFinished(sections.LOCATION_RESULT)) && (
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
              <Conclusion {...{ checker, topic, matomoTrackEvent }} />
            )}
          </StepByStepItem>
        </StepByStepNavigation>
      )}

      {/* OLO-flow only needs the Location component */}
      {!sttrFile && (
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

      <DebugDecisionTable {...{ checker, topic }} />
    </Layout>
  );
};
export default withTracking(withChecker(CheckerPage));
