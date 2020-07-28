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

  console.log(checker);
  console.log(sessionContext[slug]);
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
        <StepByStepItem
          checked={finishedQuestions}
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
export default withChecker(WrapperPage);
