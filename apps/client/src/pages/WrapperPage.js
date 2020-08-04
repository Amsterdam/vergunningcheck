import React, { useContext } from "react";
import { Helmet } from "react-helmet";

import { ComponentWrapper } from "../atoms";
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

const WrapperPage = ({ checker, topic, resetChecker }) => {
  const sessionContext = useContext(SessionContext);
  const { slug, sttrFile } = topic;
  const { finishedLocation, finishedQuestions } = sessionContext[slug] || false;

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
            lineBetweenItems
          >
            <StepByStepItem
              active={!finishedLocation}
              checked={finishedLocation}
              heading="Adres gegevens"
              largeCircle
            >
              <Location resetChecker={resetChecker} checker={checker} />
            </StepByStepItem>

            <StepByStepItem
              checked={finishedQuestions}
              done={finishedLocation}
              heading="Vragen"
              largeCircle
              // Overwrite the line between the Items
              style={{ borderColor: "white" }}
            />
            {finishedLocation && <Questions checker={checker} topic={topic} />}
            <StepByStepItem
              active={finishedLocation && finishedQuestions}
              checked={finishedLocation && finishedQuestions}
              heading="Conclusie"
              largeCircle
              // Overwrite the line between the Items
              style={{ marginTop: -1 }}
            >
              {finishedQuestions && (
                <Conclusion checker={checker} topic={topic} />
              )}
            </StepByStepItem>
          </StepByStepNavigation>
        )}

        {/* OLO-flow only needs the Location component */}
        {!sttrFile && <Location />}
      </ComponentWrapper>

      <DebugDecisionTable {...{ topic, checker }} />
    </Layout>
  );
};
export default withChecker(WrapperPage);
