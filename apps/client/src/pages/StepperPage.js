import { Paragraph, themeColor } from "@datapunt/asc-ui";
import React from "react";
import { Helmet } from "react-helmet";

import {
  StepByStepItem,
  StepByStepNavigation,
} from "../checker/StepByStepNavigation";
import DebugDecisionTable from "../components/DebugDecisionTable";
import Layout from "../components/Layouts/DefaultLayout";

const StepperPage = ({ checker }) => {
  return (
    <Layout>
      <Helmet>
        <title>Stepper Page</title>
      </Helmet>
      <StepByStepNavigation
        style={{ margin: "40px 0" }}
        customSizing
        disableFadeEffect
      >
        <StepByStepItem
          title="Tussen afgeronde stappen en tussen een afgeronde stap en de huidige stap is de lijn blauw. "
          checked
        >
          <Paragraph gutterBottom={0}>Content</Paragraph>
        </StepByStepItem>

        <StepByStepItem title="Step 2" done disableFadeOut>
          <Paragraph gutterBottom={0}>Content</Paragraph>
        </StepByStepItem>

        <StepByStepItem
          title="Step 2 a"
          checked
          small
          circleBackground={themeColor("secondary", "main")}
        ></StepByStepItem>

        <StepByStepItem title="Step 2 b" active highlight small>
          <Paragraph gutterBottom={0}>
            Een afgeronde stap heeft een blauwe bol met een checkmark-icoon. De
            huidige stap heeft een blauwe bol, die groter is dan de andere
            bollen. Deze heeft geen checkmark-icoon. Een nog niet afgeronde stap
            heeft een grijze bol, ook zonder icoon.
          </Paragraph>
        </StepByStepItem>

        <StepByStepItem title="Step 2 c" small>
          <Paragraph gutterBottom={0}>Content</Paragraph>
        </StepByStepItem>

        <StepByStepItem title="Step 3"></StepByStepItem>
      </StepByStepNavigation>

      <StepByStepNavigation style={{ margin: "40px 0", maxWidth: 200 }}>
        <StepByStepItem title="Step 1" done />
        <StepByStepItem title="Step 2 met lange tekst" checked />
        <StepByStepItem title="Step 3" active />
        <StepByStepItem title="Step 4" active checked />
        <StepByStepItem title="Step 5" />
      </StepByStepNavigation>

      <DebugDecisionTable checker={checker} />
    </Layout>
  );
};

export default StepperPage;
