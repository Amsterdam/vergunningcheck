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
import withTopic from "../hoc/withTopic";

const WrapperPage = ({ topic: { slug } }) => {
  const sessionContext = useContext(SessionContext);
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
        <StepByStepItem
          checked={finishedQuestions}
          heading="Vragen"
          largeCircle
        />
        {finishedLocation && <Questions />}
        <StepByStepItem
          active={finishedLocation && finishedQuestions}
          heading="Conclusie"
          largeCircle
        >
          {finishedQuestions && <Conclusion />}
        </StepByStepItem>
      </StepByStepNavigation>
    </Layout>
  );
};
export default withTopic(WrapperPage);
