import React from "react";
import { Helmet } from "react-helmet";

import Stepper from "../checker/Stepper";
import DebugDecisionTable from "../components/DebugDecisionTable";
import Layout from "../components/Layouts/DefaultLayout";

const StepperPage = ({ topic, checker }) => {
  return (
    <Layout>
      <Helmet>
        <title>Stepper Page</title>
      </Helmet>
      <Stepper />
      {topic}

      <DebugDecisionTable checker={checker} />
    </Layout>
  );
};

export default StepperPage;
