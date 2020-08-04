import React, { useContext } from "react";
import { Helmet } from "react-helmet";

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

const WrapperPage = ({ checker, topic }) => {
  const sessionContext = useContext(SessionContext);
  const { slug, sttrFile } = topic;
  const { activeComponents, finishedComponents } = sessionContext[slug] || [];

  const setActiveState = (component) => {
    sessionContext.setSessionData([slug, { activeComponents: [component] }]);
  };

  const setFinishedState = (component, value) => {
    let newFinishedComponents = finishedComponents || [];
    const allComponents = Array.isArray(component) ? component : [component];
    if (typeof value === "boolean" && value === false) {
      newFinishedComponents =
        finishedComponents.filter((c) => !allComponents.includes(c)) || [];
    } else {
      newFinishedComponents = [...newFinishedComponents, ...allComponents];
    }
    sessionContext.setSessionData([
      slug,
      { finishedComponents: newFinishedComponents },
    ]);
  };

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
            <Location topic={topic} setActiveState={setActiveState} />
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

        {/* Only show questions and conclusion in STTR-flow */}
        {sttrFile && (
          <>
            <StepByStepItem
              checked={isFinished("questions")}
              customSize
              done={isFinished("address")}
              heading="Vragen"
              highlightActive
              largeCircle
            />
            {isFinished("address") && (
              <Questions
                checker={checker}
                topic={topic}
                setFinishedState={setFinishedState}
                setActiveState={setActiveState}
                isFinished={isFinished}
              />
            )}
            <StepByStepItem
              active={isActive("conclusion")}
              checked={isFinished("conclusion")}
              customSize
              heading="Conclusie"
              highlightActive
              largeCircle
            >
              {isFinished("questions") && (
                <Conclusion checker={checker} topic={topic} />
              )}
            </StepByStepItem>
          </>
        )}
      </StepByStepNavigation>
      <DebugDecisionTable {...{ topic, checker }} />
    </Layout>
  );
};
export default withChecker(WrapperPage);
