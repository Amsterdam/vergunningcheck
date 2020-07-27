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

        {/* All the components below only needs to be shown in STTR flow: */}
        {/* {isSTTR && } */}
        <StepByStepItem
          checked={finishedQuestions}
          heading="Vragen"
          largeCircle
        />
        {!finishedQuestions && finishedLocation && (
          <Questions
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
