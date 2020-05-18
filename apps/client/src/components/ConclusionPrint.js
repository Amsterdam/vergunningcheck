import React, { useContext } from "react";
import { Paragraph, Heading, Icon } from "@datapunt/asc-ui";
import { Alert } from "@datapunt/asc-assets";
import uniqBy from "lodash.uniqby";

import Context from "../context";
import {
  QuestionWrapper,
  MainWrapper,
  Question,
  UserAnswer,
  UserResult,
  UserResultParagraph,
} from "../pages/ResultsPageStyles";
import { booleanOptions } from "./Question";

export default ({ checker }) => {
  const permitsPerQuestion = [];
  const context = useContext(Context);
  const {
    streetName,
    houseNumberFull,
    postalCode,
    residence,
  } = context.address;

  const event = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const today = event.toLocaleDateString("nl-NL", options);

  checker.permits.forEach((permit) => {
    const conclusionDecision = permit.getDecisionById("dummy");
    if (conclusionDecision.getOutput() === '"Vergunningplicht"') {
      const decisiveDecisions = conclusionDecision.getDecisiveInputs();
      decisiveDecisions.forEach((decision) => {
        const decisiveQuestion = decision.getDecisiveInputs().pop();
        const index = checker.stack.indexOf(decisiveQuestion);
        permitsPerQuestion[index] = (permitsPerQuestion[index] || []).concat(
          permit
        );
      });
    }
  });

  return (
    <>
      <Paragraph fontSize={12}>{window.location.href}</Paragraph>

      <Heading forwardedAs="h2">Datum</Heading>
      <Paragraph strong>{today} uur.</Paragraph>

      <Heading forwardedAs="h2">Adresgegevens</Heading>
      <Paragraph strong>
        {streetName} {houseNumberFull}
        <br />
        {postalCode} {residence}
      </Paragraph>

      <Heading forwardedAs="h2">Uw antwoorden</Heading>
      <Paragraph>
        Hieronder kunt u per vraag uw gegeven antwoord teruglezen.
      </Paragraph>

      <MainWrapper>
        <Question strong>Vraag</Question>
        <UserAnswer strong>Uw antwoord</UserAnswer>
      </MainWrapper>
      <div style={{ marginBottom: 40 }}>
        {checker?.stack?.map((question, index) => {
          const isDecisiveForPermits =
            uniqBy(permitsPerQuestion[index], "name") || [];
          return (
            <QuestionWrapper key={question.id}>
              <Question>{question.text}</Question>
              {question.options ? (
                <UserAnswer>{question.answer.replace(/['"]+/g, "")}</UserAnswer>
              ) : (
                <UserAnswer>
                  {
                    booleanOptions.find(
                      (option) => option.value === question.answer
                    ).label
                  }
                </UserAnswer>
              )}

              {isDecisiveForPermits.map((permit, index) => (
                <UserResult key={`${permit} ${index}`}>
                  <Icon
                    color="secondary"
                    size={30}
                    style={{
                      flexShrink: 0, // IE11 Fix
                    }}
                  >
                    <Alert />
                  </Icon>
                  <UserResultParagraph strong>
                    Op basis van dit antwoord bent u vergunningplichtig voor{" "}
                    {permit.name.replace("Conclusie", "").toLowerCase()}
                  </UserResultParagraph>
                </UserResult>
              ))}
            </QuestionWrapper>
          );
        })}
      </div>
    </>
  );
};
