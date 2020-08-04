import React, { useContext } from "react";
import { Helmet } from "react-helmet";

import { ComponentWrapper } from "../atoms";
import Conclusion from "../components/Conclusion";
import DebugDecisionTable from "../components/DebugDecisionTable";
import Layout from "../components/Layouts/DefaultLayout";
import Address from "../components/Location/Address";
import Location from "../components/Location/Location";
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
  const { activeComponents, finishedComponents } = sessionContext[slug] || []; // At startup we don't have activeComponent or finishedComponents, so start with empty array.

  // Only one component can be active at the same time.
  const setActiveState = (component) => {
    sessionContext.setSessionData([slug, { activeComponents: [component] }]);
  };

  // Pass a component name, or a array of components, this array or component will all be finished or removed.
  const setFinishedState = (component, value) => {
    let newFinishedComponents = finishedComponents || []; // If there are no finishedComponents start with a empty array.
    const allComponents = Array.isArray(component) ? component : [component];
    if (typeof value === "boolean" && value === false) {
      newFinishedComponents =
        finishedComponents?.filter((c) => !allComponents.includes(c)) || [];
    } else {
      newFinishedComponents = [...newFinishedComponents, ...allComponents];
    }
    // Save the new sessionData to the contex
    sessionContext.setSessionData([
      slug,
      { finishedComponents: newFinishedComponents },
    ]);
  };

  // @TODO: maybe this code can be refactored to one function, but i think this is really declarative. Lets discuss
  const isActive = (component) => {
    const allComponents = Array.isArray(component) ? component : [component];
    return activeComponents?.includes(...allComponents) || false;
  };
  const isFinished = (component) => {
    const allComponents = Array.isArray(component) ? component : [component];
    return finishedComponents?.includes(...allComponents) || false;
  };

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
              active={
                (isActive("location") ||
                  isActive("address") ||
                  !activeComponents) &&
                !isFinished("address")
              }
              checked={isFinished("address")}
              heading="Adres gegevens"
              largeCircle
            >
              {(!activeComponents || isActive("location")) && (
                <Location
                  topic={topic}
                  resetChecker={resetChecker}
                  setActiveState={setActiveState}
                />
              )}
              {(isActive("address") || isFinished("address")) && (
                <Address
                  topic={topic}
                  isFinished={isFinished}
                  setActiveState={setActiveState}
                  setFinishedState={setFinishedState}
                />
              )}
            </StepByStepItem>
            <StepByStepItem
              checked={isFinished("questions")}
              customSize
              done={isFinished("address")}
              heading="Vragen"
              largeCircle
            />
            {isFinished("address") && (
              <Questions
                checker={checker}
                topic={topic}
                setFinishedState={setFinishedState}
                setActiveState={setActiveState}
                isActive={isActive}
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
                <Conclusion checker={checker} topic={topic} />
              )}
            </StepByStepItem>
          </StepByStepNavigation>
        )}

        {/* OLO-flow only needs the Location component */}
        {!sttrFile && (!activeComponents || isActive("location")) && (
          <Location topic={topic} setActiveState={setActiveState} />
        )}
        {!sttrFile && isActive("address") && (
          <Address
            topic={topic}
            isFinished={isFinished}
            setActiveState={setActiveState}
            setFinishedState={setFinishedState}
          />
        )}
      </ComponentWrapper>

      <DebugDecisionTable {...{ topic, checker }} />
    </Layout>
  );
};
export default withChecker(WrapperPage);
