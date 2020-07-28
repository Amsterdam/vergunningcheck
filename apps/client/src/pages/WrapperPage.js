import React, { useContext } from "react";
import { Helmet } from "react-helmet";

import Conclusion from "../components/Conclusion";
import Layout from "../components/Layouts/DefaultLayout";
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
  const { slug } = topic;
  const { finishedLocation, finishedQuestions } = sessionContext[slug] || false;

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
          active={!finishedLocation}
          checked={finishedLocation}
          heading="Adres gegevens"
          largeCircle
        >
          <Location />
        </StepByStepItem>

        {/* All the components below only needs to be shown in STTR flow: */}
        {/* {isSTTR && } */}
        <StepByStepItem
          checked={finishedQuestions}
          done={finishedLocation}
          heading="Vragen"
          largeCircle
        />
        {finishedLocation && <Questions checker={checker} topic={topic} />}
        <StepByStepItem
          active={finishedLocation && finishedQuestions}
          heading="Conclusie"
          largeCircle
        >
          {finishedQuestions && <Conclusion checker={checker} topic={topic} />}
        </StepByStepItem>
      </StepByStepNavigation>
    </Layout>
  );
};
// Added withChecker() to fix errors on (hot) reloading
export default withChecker(WrapperPage);
