import React from "react";
import { Helmet } from "react-helmet";

import Conclusion from "../components/Conclusion";
import Layout from "../components/Layouts/DefaultLayout";
import Location from "../components/Location/Location";
import Questions from "../components/Questions";
import {
  StepByStepItem,
  StepByStepNavigation,
} from "../components/StepByStepNavigation";

const WrapperPage = ({ topic }) => (
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
      <StepByStepItem active heading="Adres gegevens" largeCircle>
        <Location />
      </StepByStepItem>
      <StepByStepItem active heading="Vragen" largeCircle />
      <Questions />
      <StepByStepItem active heading="Conclusie" largeCircle>
        <Conclusion />
      </StepByStepItem>
    </StepByStepNavigation>
  </Layout>
);

export default WrapperPage;
