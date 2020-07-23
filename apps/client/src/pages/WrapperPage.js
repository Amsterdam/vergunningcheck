import React, { useState } from "react";
import { Helmet } from "react-helmet";

import Conclusion from "../components/Conclusion";
import Layout from "../components/Layouts/DefaultLayout";
import Location from "../components/Location/Location";
import Questions from "../components/Questions";
import {
  StepByStepItem,
  StepByStepNavigation,
} from "../components/StepByStepNavigation";

const WrapperPage = () => {
  const [finishedLocation, setFinishedLocation] = useState(false);
  const [finishedQuestions, setFinishedQuestions] = useState(false);
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
        style={{ margin: "40px 0" }}
      >
        <StepByStepItem
          active={!finishedLocation}
          checked={finishedLocation}
          heading="Adres gegevens"
          largeCircle
        >
          <Location
            finishedLocation={finishedLocation}
            setFinishedLocation={setFinishedLocation}
          />
        </StepByStepItem>
        <StepByStepItem
          active={finishedLocation && !finishedQuestions}
          checked={finishedQuestions}
          heading="Vragen"
          largeCircle
        />
        {!finishedQuestions && (
          <Questions
            finishedLocation={finishedLocation}
            finishedQuestions={finishedQuestions}
            setFinishedLocation={setFinishedLocation}
            setFinishedQuestions={setFinishedQuestions}
          />
        )}
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
export default WrapperPage;
