import { Button, Heading, Paragraph } from "@datapunt/asc-ui";
import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";

import Layout from "../checker/components/Layouts/DefaultLayout";
import Nav from "../checker/components/Nav";
import Question, { booleanOptions } from "../checker/components/Question";
import {
  StepByStepItem,
  StepByStepNavigation,
} from "../checker/components/StepByStepNavigation";
import DebugDecisionTable from "../components/DebugDecisionTable";
// import Layout from "../components/Layouts/DefaultLayout";
import { SessionContext } from "../context";
import withChecker from "../hoc/withChecker";

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

const WrapperPage = ({ checker, topic: { slug } }) => {
  const sessionContext = useContext(SessionContext);

  const [stepper1, updateStepper1] = useState(1);

  const needContactPermits = () =>
    checker.permits.find((permit) => {
      const conclusion = permit.getDecisionById("dummy");
      const conclusionMatchingRules = conclusion.getMatchingRules();
      return conclusionMatchingRules.find(
        (rule) => rule.outputValue === '"NeemContactOpMet"'
      );
    });

  const onQuestionNext = (value) => {
    const question = checker.stack[sessionContext[slug].questionIndex];

    // Provide the user answers to the `sttr-checker`
    if (question.options && value !== undefined) {
      question.setAnswer(value);
    }
    if (!question.options && value) {
      const responseObj = booleanOptions.find((o) => o.formValue === value);
      question.setAnswer(responseObj.value);
    }

    // Store all answers in the session context
    sessionContext.setSessionData([
      slug,
      {
        answers: checker.getQuestionAnswers(),
      },
    ]);

    const next = checker.next();

    // Go directly to the Conclusion Page, without passing the Results Page
    // Only if the `sttr-checker` is the final question
    if (needContactPermits() && !next) {
      // Undo the next() with previous(), because we were already at the final question
      checker.previous();

      // Change the URL to the Conclusion Page
      // open the conclusion page
    } else {
      // Load the next question or go to the Result Page
      if (next) {
        // Store the new questionIndex in the session
        sessionContext.setSessionData([
          slug,
          {
            questionIndex: sessionContext[slug].questionIndex + 1,
          },
        ]);

        // Go to Next question
        // go go go
      } else {
        // Go to Result page if there is no new quesion
        // Go open the conclusion
      }
    }
  };

  const onQuestionPrev = () => {
    // Load the previous question or go to the Location Page
    if (checker.stack.length > 1) {
      // Store the new questionIndex in the session
      sessionContext.setSessionData([
        slug,
        {
          questionIndex: sessionContext[slug].questionIndex - 1,
        },
      ]);

      // go open te location page
    } else {
      // Go back to the Location page
      // go open te location page
    }
  };

  const onGoToQuestion = (questionIndex) => {
    // Go to the specific question in the stack
    checker.rewindTo(questionIndex);
    sessionContext.setSessionData([
      slug,
      {
        questionIndex,
      },
    ]);
  };

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

        {checker.stack.map((q, i) => {
          if (q === checker.stack[sessionContext[slug].questionIndex]) {
            return (
              <StepByStepItem
                heading={stepper1 >= 2 && q.text}
                active
                // checked={stepper1 > 3}
              >
                <Question
                  question={q}
                  key={`question-${q.id}-${i}`}
                  onSubmit={onQuestionNext}
                  onGoToPrev={onQuestionPrev}
                  showPrev
                  showNext
                />
              </StepByStepItem>
            );
          } else {
            let answer;
            if (q.options) {
              answer = q.answer;
            } else {
              const responseObj = booleanOptions.find(
                (o) => o.value === q.answer
              );
              answer = responseObj?.label;
            }
            return (
              <StepByStepItem heading={stepper1 >= 2 && q.text} checked>
                <Paragraph>
                  {answer?.replace(/['"]+/g, "")}
                  <Button
                    style={{ marginLeft: 20 }}
                    onClick={() => onGoToQuestion(i)}
                    variant="textButton"
                  >
                    Wijzig
                  </Button>
                </Paragraph>
              </StepByStepItem>
            );
          }
        })}

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
      <DebugDecisionTable checker={checker} />
    </Layout>
  );
};

export default withChecker(WrapperPage);
