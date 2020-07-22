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
          active
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
          active
          checked={finishedQuestions}
          heading="Vragen"
          largeCircle
        />
        <Questions
          finishedLocation={finishedLocation}
          finishedQuestions={finishedQuestions}
          setFinishedLocation={setFinishedLocation}
          setFinishedQuestions={setFinishedQuestions}
        />
        <StepByStepItem active heading="Conclusie" largeCircle>
          <Conclusion
            setFinishedQuestions={setFinishedQuestions}
            finishedQuestions={finishedQuestions}
          />
        </StepByStepItem>
      </StepByStepNavigation>
    </Layout>
  );
};

export default WrapperPage;
