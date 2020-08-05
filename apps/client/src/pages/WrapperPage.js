import React, { useContext } from "react";
import { Helmet } from "react-helmet";

import { ComponentWrapper } from "../atoms";
import Conclusion from "../components/Conclusion";
import DebugDecisionTable from "../components/DebugDecisionTable";
import Layout from "../components/Layouts/DefaultLayout";
import LocationInput from "../components/Location/LocationInput";
import LocationResult from "../components/Location/LocationResult";
import Questions from "../components/Questions";
import {
  StepByStepItem,
  StepByStepNavigation,
} from "../components/StepByStepNavigation";
import { SessionContext } from "../context";
import withChecker from "../hoc/withChecker";

const WrapperPage = ({ checker, topic, resetChecker }) => {
  const sessionContext = useContext(SessionContext);
  const { slug, sttrFile } = topic;
  // At startup we don't have activeComponent or finishedComponents, so start with empty array.
  const { activeComponents, finishedComponents } = sessionContext[slug];

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
    sessionContext.setSessionData([slug, ...newFinishedComponents]);
  };

  const isActive = (component, finished = false) => {
    // If component is only a string, we make it a array first
    const allComponents = Array.isArray(component) ? component : [component];

    // If finished is true we check if it's finished, else check activeComponents.
    const components = finished ? finishedComponents : activeComponents;
    return components.includes(...allComponents) || false;
  };

  const isFinished = (component) => isActive(component, true);

  return (
    <Layout>
      <Helmet>
        <title>Wrapper Page</title>
      </Helmet>
      <ComponentWrapper>
        {/* STTR-flow with the StepByStepNavigation */}
        {sttrFile && (
          <StepByStepNavigation
            customSize
            disabledTextColor="inherit"
            doneTextColor="inherit"
            highlightActive
          >
            <StepByStepItem
              active={isActive("locationInput") || isActive("locationResult")}
              checked={isFinished("locationResult")}
              heading="Adres gegevens"
              largeCircle
            >
              {isActive("locationInput") && (
                <LocationInput
                  {...{
                    topic,
                    resetChecker,
                    setActiveState,
                  }}
                />
              )}
              {(isActive("locationResult") || isFinished("locationResult")) && (
                <LocationResult
                  {...{
                    topic,
                    isFinished,
                    setActiveState,
                    setFinishedState,
                  }}
                />
              )}
            </StepByStepItem>
            <StepByStepItem
              checked={isFinished("questions")}
              customSize
              done={isFinished("locationResult")}
              heading="Vragen"
              largeCircle
            />
            {isFinished("locationResult") && (
              <Questions
                {...{
                  checker,
                  topic,
                  setFinishedState,
                  setActiveState,
                  isActive,
                  isFinished,
                }}
              />
            )}
            <StepByStepItem
              active={isActive("conclusion")}
              checked={isFinished("conclusion")}
              customSize
              heading="Conclusie"
              largeCircle
            >
              {isFinished("questions") && (
                <Conclusion {...{ topic, checker }} />
              )}
            </StepByStepItem>
          </StepByStepNavigation>
        )}

        {/* OLO-flow only needs the Location component */}
        {!sttrFile && (
          <>
            {isActive("locationInput") && (
              <LocationInput {...{ topic, setActiveState }} />
            )}
            {isActive("locationResult") && (
              <LocationResult
                {...{
                  topic,
                  isFinished,
                  setActiveState,
                  setFinishedState,
                }}
              />
            )}
          </>
        )}
      </ComponentWrapper>

      <DebugDecisionTable {...{ topic, checker }} />
    </Layout>
  );
};
export default withChecker(WrapperPage);
