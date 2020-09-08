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
import { SessionContext } from "../context";
import withChecker from "../hoc/withChecker";
import withTracking from "../hoc/withTracking";
import { geturl, routes } from "../routes";

const CheckerPage = ({ checker, matomoPageView, topic, resetChecker }) => {
  const sessionContext = useContext(SessionContext);
  const { slug, sttrFile, text } = topic;
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
  matomoPageView();
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
    !isActive("conclusion") && isFinished("questions")
      ? () => setActiveState("conclusion")
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
            active={isActive("locationInput") || isActive("locationResult")}
            checked={isActive("locationResult") || isFinished("locationResult")}
            done={isActive("locationInput") || isActive("locationResult")}
            heading="Adresgegevens"
            largeCircle
            // Overwrite the line between the Items
            style={
              isActive("locationInput") ||
              isActive("locationResult") ||
              questionIndex === 0
                ? checkedStyle
                : {}
            }
          >
            {/* @TODO: Refactor this, because of duplicate code */}
            {isActive("locationInput") && (
              <LocationInput
                {...{
                  isFinished,
                  resetChecker,
                  setActiveState,
                  setFinishedState,
                  topic,
                }}
              />
            )}
            {/* @TODO: Refactor this, because of duplicate code */}
            {!isActive("locationInput") &&
              (isActive("locationResult") || isFinished("locationResult")) && (
                <LocationResult
                  {...{
                    isActive,
                    isFinished,
                    setActiveState,
                    setFinishedState,
                    topic,
                  }}
                />
              )}
          </StepByStepItem>
          <StepByStepItem
            active={isActive("questions") && questionIndex === 0}
            checked={isFinished("questions")}
            customSize
            done={answers || isActive("questions")}
            heading="Vragen"
            largeCircle
            // Overwrite the line between the Items
            style={checkedStyle}
          />
          <Questions
            {...{
              checker,
              topic,
              setFinishedState,
              setActiveState,
              isActive,
              goToQuestion,
              isFinished,
            }}
          />
          <StepByStepItem
            active={isActive("conclusion")}
            as="div"
            checked={isFinished("questions")}
            done={isFinished("questions")}
            customSize
            heading="Conclusie"
            largeCircle
            onClick={handleConclusionClick}
            // Overwrite the line between the Items
            style={{ marginTop: -1 }}
          >
            {isFinished("questions") && <Conclusion {...{ topic, checker }} />}
          </StepByStepItem>
        </StepByStepNavigation>
      )}

      {/* OLO-flow only needs the Location component */}
      {!sttrFile && (
        <>
          {/* @TODO: Refactor this, because of duplicate code */}
          {isActive("locationInput") && (
            <LocationInput
              {...{ isFinished, setActiveState, setFinishedState, topic }}
            />
          )}
          {isActive("locationResult") && (
            <LocationResult
              {...{
                isActive,
                isFinished,
                setActiveState,
                setFinishedState,
                topic,
              }}
            />
          )}
        </>
      )}

      <DebugDecisionTable {...{ topic, checker }} />
    </Layout>
  );
};
export default withTracking(withChecker(CheckerPage));
