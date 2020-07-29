import React, { useContext } from "react";
import { Helmet } from "react-helmet";

import Conclusion from "../components/Conclusion";
import DebugDecisionTable from "../components/DebugDecisionTable";
import Layout from "../components/Layouts/DefaultLayout";
import Link from "../components/Link";
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
  const {
    finishedLocation,
    finishedQuestions,
    activeComponents,
    finishedComponents,
  } = sessionContext[slug];

  const setActiveState = (component, value) => {
    let setActiveComponents = activeComponents || [];
    if (!value) {
      setActiveComponents.filter((c) => c !== component);
    } else {
      setActiveComponents.push(component);
    }
    sessionContext.setSessionData([
      slug,
      { activeComponents: setActiveComponents },
    ]);
  };
  const setFinishedState = (component, value) => {
    let setFinishedComponents = finishedComponents || [];
    if (!value) {
      setFinishedComponents.filter((c) => c !== component);
    } else {
      setFinishedComponents.push(component);
    }
    sessionContext.setSessionData([
      slug,
      { finishedComponents: setFinishedComponents },
    ]);
  };

  return (
    <Layout>
      <Helmet>
        <title>Wrapper Page</title>
      </Helmet>
      <Link onClick={() => setActiveState("locationInput", false)}>
        set active state
      </Link>
      <Link onClick={() => setFinishedState("locationInput", true)}>
        setFinishedState
      </Link>
      <StepByStepNavigation
        customSize
        disabledTextColor="inherit"
        doneTextColor="inherit"
        highlightActive
      >
        <StepByStepItem
          active={!finishedLocation}
          checked={finishedLocation}
          heading="Adres gegevens"
          largeCircle
        >
          <Location />
        </StepByStepItem>

        {/* Only show questions and conclusion in STTR-flow */}
        {sttrFile && (
          <>
            <StepByStepItem
              checked={finishedQuestions}
              customSize
              done={finishedLocation}
              heading="Vragen"
              highlightActive
              largeCircle
            />
            {finishedLocation && <Questions checker={checker} topic={topic} />}
            <StepByStepItem
              active={finishedLocation && finishedQuestions}
              checked={finishedLocation && finishedQuestions}
              customSize
              heading="Conclusie"
              highlightActive
              largeCircle
            >
              {finishedQuestions && (
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
