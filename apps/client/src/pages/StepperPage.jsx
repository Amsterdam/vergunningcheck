import { Heading, Paragraph } from "@datapunt/asc-ui";
import React, { useState } from "react";
import { Helmet } from "react-helmet";

import Layout from "../checker/components/Layouts/DefaultLayout";
import Nav from "../checker/components/Nav";
import {
  StepByStepItem,
  StepByStepNavigation,
} from "../checker/components/StepByStepNavigation";
import DebugDecisionTable from "../components/DebugDecisionTable";
import withTopic from "../hoc/withTopic";

/**
 *
 * To fix:
 * - add aria-roles
 * - add animateLoading?
 * - add "Wijzig" button?
 * - highlightActive on mobile
 * - focus state
 * - write tests
 *
 * Questions design team:
 * - circles desktop 36px?
 *
 *
 * See: *
 * - https://formulier.amsterdam.nl/thema/bestuur-organisatie/stadsdelen/centrum/aanmelden-spreekuur/Uw-gegevens/ *
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
    <>
      <Nav
        onGoToPrev={() => updateStepper(stepper - 1)}
        onGoToNext={() => updateStepper(stepper + 1)}
        {...{ showPrev, showNext }}
      />
    </>
  ) : null;

const StepperPage = ({ checker, topic }) => {
  const [stepper1, updateStepper1] = useState(1);

  return (
    <Layout>
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
          active={stepper1 === 1}
          checked={stepper1 > 1}
          heading="Locatie"
          onClick={
            stepper1 > 1
              ? () => {
                  updateStepper1(1);
                }
              : null
          }
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
            updateStepper={updateStepper1}
            stepper={stepper1}
            showPrev={false}
          />
        </StepByStepItem>

        <StepByStepItem
          heading="Vragen"
          largeCircle
          done={stepper1 >= 2 && stepper1 <= 6}
          checked={stepper1 > 6}
          disabled={stepper1 < 2}
        />

        <StepByStepItem
          // circleBackgroundColor={themeColor("secondary", "main")}
          heading={
            stepper1 >= 2 &&
            `Aan welke kant van het gebouw gaat u de dakkapel plaatsen?`
          }
          active={stepper1 === 2}
          checked={stepper1 > 2}
        >
          <Paragraph gutterBottom={0}>Zijkant</Paragraph>

          <StepperNav
            step={2}
            updateStepper={updateStepper1}
            stepper={stepper1}
            showRadio
          />
        </StepByStepItem>

        <StepByStepItem
          heading={
            stepper1 >= 3 &&
            `U gaat dakkapel plaatsen aan de zijkant van het gebouw. Wat is de ligging?`
          }
          active={stepper1 === 3}
          checked={stepper1 > 3}
        >
          <Paragraph gutterBottom={0}>
            Aan een plein, park of parkeerplaats waar iedereen mag komen
          </Paragraph>
          <StepperNav
            step={3}
            updateStepper={updateStepper1}
            stepper={stepper1}
            showRadio
          />
        </StepByStepItem>

        <StepByStepItem
          heading={stepper1 >= 4 && `Krijgt de dakkapel een plat dak?`}
          active={stepper1 === 4}
          checked={stepper1 > 4}
        >
          <Paragraph gutterBottom={0}>Ja</Paragraph>
          <StepperNav
            step={4}
            updateStepper={updateStepper1}
            stepper={stepper1}
            showRadio
          />
        </StepByStepItem>

        <StepByStepItem
          heading={stepper1 >= 5 && `Wordt de dakkapel hoger dan 1,75 meter?`}
          active={stepper1 === 5}
          checked={stepper1 > 5}
        >
          <Paragraph gutterBottom={0}>Nee</Paragraph>
          <StepperNav
            step={5}
            updateStepper={updateStepper1}
            stepper={stepper1}
            showRadio
          />
        </StepByStepItem>

        <StepByStepItem
          heading={
            stepper1 >= 6 &&
            `Wordt de afstand van het laagste punt van het dak tot de onderkant van de dakkapel tussen de 50 en 100 centimeter?`
          }
          active={stepper1 === 6}
          checked={stepper1 > 6}
        >
          <Paragraph gutterBottom={0}>Ja</Paragraph>
          <StepperNav
            step={6}
            updateStepper={updateStepper1}
            stepper={stepper1}
            showRadio
          />
        </StepByStepItem>

        <StepByStepItem
          heading="Conclusie"
          largeCircle
          active={stepper1 === 7}
          checked={stepper1 === 7}
          disabled={stepper1 < 7}
        >
          {stepper1 === 7 && (
            <>
              <Paragraph>
                U bent klaar met de vergunningcheck. Dit is de uitkomst:
              </Paragraph>
              <Heading as="h2">U hebt geen vergunning nodig. </Heading>
            </>
          )}
          <StepperNav
            step={7}
            updateStepper={updateStepper1}
            stepper={stepper1}
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
        <StepByStepItem heading="Step 5" active href="#" />
        <StepByStepItem heading="Step 6" disabled href="#" />
      </StepByStepNavigation>

      <DebugDecisionTable checker={checker} topic={topic} />
    </Layout>
  );
};

export default withTopic(StepperPage);
