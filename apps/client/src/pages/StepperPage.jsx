/* istanbul ignore file */
// THIS PAGE IS FOR DEMO PURPOSES ONLY
// DONT REVIEW THIS PAGE EXTENSIVELY

import { Heading, Paragraph, themeColor } from "@amsterdam/asc-ui";
import React, { useState } from "react";
import { Helmet } from "react-helmet";

import DebugDecisionTable from "../components/DebugDecisionTable";
import Layout from "../components/Layouts/DefaultLayout";
import Nav from "../components/Nav";
import {
  StepByStepItem,
  StepByStepNavigation,
} from "../components/StepByStepNavigation";
import withTopic from "../hoc/withTopic";

/**
 *
 * To fix:
 * - add aria-roles
 * - write tests
 *
 * Questions to designer:
 * - circles desktop 36px?
 * - highlightActive on mobile?
 *
 *
 * See:
 * - https://formulier.amsterdam.nl/thema/bestuur-organisatie/stadsdelen/centrum/aanmelden-spreekuur/Uw-gegevens/
 * - https://designsystem.amsterdam.nl/7awj1hc9f/p/0659fc-step-by-step-navigation
 *
 *
 */

const StepperNav = ({
  step,
  stepper,
  updateStepper,
  showPrev = true,
  showNext = true,
}) =>
  step === stepper ? (
    <Nav
      onGoToPrev={() => updateStepper(stepper - 1)}
      onGoToNext={() => updateStepper(stepper + 1)}
      {...{ showPrev, showNext }}
    />
  ) : null;

const StepperPage = ({ checker, topic }) => {
  const [step, updateStep] = useState(1);
  const handleClick = () => {
    if (step > 1) {
      updateStep(1);
    }
  };

  return (
    <Layout checker={checker}>
      <Helmet>
        <title>Stepper Page</title>
      </Helmet>

      <Heading forwardedAs="h2">Custom component layout</Heading>
      <Paragraph>
        Custom content, configurable circle sizes and the `active` item is
        highlighted
      </Paragraph>

      <StepByStepNavigation
        customSize
        disabledTextColor="inherit"
        doneTextColor="inherit"
        highlightActive
        style={{ margin: "40px 0" }}
      >
        <StepByStepItem
          active={step === 1}
          checked={step > 1}
          heading="Locatie"
          onClick={() => handleClick(step)}
          largeCircle
        >
          <Paragraph>
            Over <strong>Prinsengracht 731 E</strong> hebben we de volgende
            informatie gevonden:
          </Paragraph>
          <Paragraph gutterBottom={0} strong>
            Monument:
          </Paragraph>
          <Paragraph>Nee. Geen monument</Paragraph>
          <Paragraph gutterBottom={0} strong>
            Beschermd stads- of dorpsgezicht:
          </Paragraph>
          <Paragraph gutterBottom={0}>
            Ja. Het gebouw ligt in een beschermd stads- of dorpsgezicht.
          </Paragraph>

          <StepperNav
            step={1}
            updateStepper={updateStep}
            stepper={step}
            showPrev={false}
          />
        </StepByStepItem>

        <StepByStepItem
          heading="Vragen"
          largeCircle
          done={step >= 2 && step <= 6}
          checked={step > 6}
          disabled={step < 2}
        />

        <StepByStepItem
          heading={
            step >= 2 &&
            `Aan welke kant van het gebouw gaat u de dakkapel plaatsen?`
          }
          active={step === 2}
          checked={step > 2}
        >
          <Paragraph gutterBottom={0}>Zijkant</Paragraph>

          <StepperNav
            step={2}
            updateStepper={updateStep}
            stepper={step}
            showRadio
          />
        </StepByStepItem>

        <StepByStepItem
          heading={
            step >= 3 &&
            `U gaat dakkapel plaatsen aan de zijkant van het gebouw. Wat is de ligging?`
          }
          active={step === 3}
          checked={step > 3}
        >
          <Paragraph gutterBottom={0}>
            Aan een plein, park of parkeerplaats waar iedereen mag komen
          </Paragraph>
          <StepperNav
            step={3}
            updateStepper={updateStep}
            stepper={step}
            showRadio
          />
        </StepByStepItem>

        <StepByStepItem
          heading={step >= 4 && `Krijgt de dakkapel een plat dak?`}
          active={step === 4}
          checked={step > 4}
        >
          <Paragraph gutterBottom={0}>Ja</Paragraph>
          <StepperNav
            step={4}
            updateStepper={updateStep}
            stepper={step}
            showRadio
          />
        </StepByStepItem>

        <StepByStepItem
          heading={step >= 5 && `Wordt de dakkapel hoger dan 1,75 meter?`}
          active={step === 5}
          checked={step > 5}
          circleBackgroundColor={themeColor("secondary", "main")} // Use this in case of a red circle
        >
          <Paragraph gutterBottom={0}>Nee</Paragraph>
          <StepperNav
            step={5}
            updateStepper={updateStep}
            stepper={step}
            showRadio
          />
        </StepByStepItem>

        <StepByStepItem
          heading={
            step >= 6 &&
            `Wordt de afstand van het laagste punt van het dak tot de onderkant van de dakkapel tussen de 50 en 100 centimeter?`
          }
          active={step === 6}
          checked={step > 6}
        >
          <Paragraph gutterBottom={0}>Ja</Paragraph>
          <StepperNav
            step={6}
            updateStepper={updateStep}
            stepper={step}
            showRadio
          />
        </StepByStepItem>

        <StepByStepItem
          heading="Conclusie"
          largeCircle
          active={step === 7}
          checked={step === 7}
          disabled={step < 7}
        >
          {step === 7 && (
            <>
              <Paragraph>
                U bent klaar met de vergunningcheck. Dit is de uitkomst:
              </Paragraph>
              <Heading as="h2">U hebt geen vergunning nodig. </Heading>
            </>
          )}
          <StepperNav
            step={7}
            updateStepper={updateStep}
            stepper={step}
            showRadio
            showNext={false}
          />
        </StepByStepItem>
      </StepByStepNavigation>

      <hr />
      <Heading forwardedAs="h2">Default component layout</Heading>
      <Paragraph>Only the `active` item has a large circle</Paragraph>

      <StepByStepNavigation style={{ margin: "40px 0", maxWidth: 200 }}>
        <StepByStepItem heading="Step 1" checked href="#" />
        <StepByStepItem
          heading="Step 2 met lange tekst"
          checked
          onClick={() => console.log("click")}
        />
        <StepByStepItem heading="Step 3" checked href="#" />
        <StepByStepItem heading="Step 4" checked href="#" />
        <StepByStepItem heading="Step 5" active />
        <StepByStepItem heading="Step 6" disabled />
      </StepByStepNavigation>

      <DebugDecisionTable checker={checker} topic={topic} />
    </Layout>
  );
};

export default withTopic(StepperPage);
