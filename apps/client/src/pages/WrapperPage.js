import React, { useContext } from "react";
import { Helmet } from "react-helmet";

import Conclusion from "../components/Conclusion";
import DebugDecisionTable from "../components/DebugDecisionTable";
import Layout from "../components/Layouts/DefaultLayout";
import Location from "../components/Location/Location";
import Questions from "../components/Questions";
import {
  StepByStepItem,
  StepByStepNavigation,
} from "../components/StepByStepNavigation";
import { SessionContext } from "../context";
import withChecker from "../hoc/withChecker";
import Address from "../components/Location/Address";

const WrapperPage = ({ checker, topic }) => {
  const sessionContext = useContext(SessionContext);
  const { slug, sttrFile } = topic;
  const {
    activeComponents,
    finishedComponents,
  } = sessionContext[slug] || ['location'];


  const setActiveState = (component, value) => {
    let setActiveComponents = activeComponents || ['location'];
    if (!value) {
      setActiveComponents.filter((c) => c !== component);
    } else {
      setActiveComponents.push(component);
    }
    console.log(finishedComponents);
    console.log(activeComponents);

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

  const isActive = (component) => activeComponents?.includes(component) || false;
  const isFinished = (component) => finishedComponents?.includes(component) || false;

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
          active={() => { isActive('location') || isActive('address')}}
          checked={() => isFinished('location', 'address')}
          heading="Adres gegevens"
          largeCircle
        >{console.log('isActive', isActive('location'))}
          { isActive('location') && <Location topic={topic} setActiveState={setActiveState} /> }
          { isActive('address') && <Address topic={topic} setActiveState={setActiveState} setFinishedState={setFinishedState} /> }
        </StepByStepItem>

        {/* Only show questions and conclusion in STTR-flow */}
        {sttrFile && (
          <>
            <StepByStepItem
              checked={() => isFinished('questions')}
              customSize
              done={() => isFinished('location')}
              heading="Vragen"
              highlightActive
              largeCircle
            />
            {isFinished('location') && !isFinished('questions') && <Questions checker={checker} topic={topic} setFinishedState={setFinishedState} />}
            <StepByStepItem
              active={() => isActive('conclusion')}
              customSize
              heading="Conclusie"
              highlightActive
              largeCircle
            >
              {isFinished('questions') && (
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
