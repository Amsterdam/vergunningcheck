import React, { useContext } from "react";
import { Helmet } from "react-helmet";

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
import { SessionContext, SessionDataType } from "../context";
import { useChecker, useTopic } from "../hooks";
import LoadingPage from "./LoadingPage";
import NotFoundPage from "./NotFoundPage";

type Props = {
  resetChecker: any;
};

const CheckerPage = ({ resetChecker }: Props) => {
  const sessionContext = useContext(SessionContext) as SessionDataType;
  const topic = useTopic();
  const checker = useChecker();

  if (!topic) {
    return <NotFoundPage />;
  }
  if (topic.sttrFile && !checker) {
    return <LoadingPage />;
  }

  const { slug, sttrFile, text } = topic;

  //@TODO: We shoudn't need this redirect. We need to refactor this
  // if (!sessionContext[slug]) {
  //   return <Redirect to={geturl(routes.intro, topic)} />;
  // }
  if (!sessionContext[slug]) {
    sessionContext.setSessionData([
      slug,
      { activeComponents: ["locationInput"], finishedComponents: [] },
    ]);
    return <LoadingPage />;
  }

  // OLO Flow does not have questionIndex
  // const questionIndex = sttrFile ? sessionContext[slug].questionIndex : 0;
  const {
    activeComponents,
    answers,
    finishedComponents,
    questionIndex = 0,
  } = sessionContext[slug];

  // Only one component can be active at the same time.
  const setActiveState = (component: string) => {
    sessionContext.setSessionData([slug, { activeComponents: [component] }]);
  };

  /**
   * Set given components to the given finished state
   *
   * @param { string[] | string } component - name or names of the components
   * @param { boolean } value - Set components to finished state or remove from finished state.
   */
  const setFinishedState = (component: string[] | string, value: boolean) => {
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

  const isActive = (component: string[] | string, finished = false) => {
    // If component is only a string, we make it a array first
    const allComponents = Array.isArray(component) ? component : [component];

    // If finished is true we check if it's finished, else check activeComponents.
    const components = finished
      ? finishedComponents
      : activeComponents
      ? activeComponents
      : [];
    return components.includes(allComponents[0]);
  };

  const isFinished = (component: string[] | string) =>
    isActive(component, true);

  /**
   * Set the questionIndex the next questionId, previous questionId, or the given id.
   *
   * @param { int | ('next'|'prev') } value - This can be, '"next", "prev" or a int`
   */
  const goToQuestion = (value: string | number) => {
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
            done={!!answers || isActive("questions")}
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
            checked={isFinished("questions")}
            done={isFinished("questions")}
            customSize
            heading="Conclusie"
            largeCircle
            onClick={() => handleConclusionClick}
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
export default CheckerPage;
