import { Alert } from "@datapunt/asc-assets";
import { Button, Icon, themeColor } from "@datapunt/asc-ui";
import React from "react";

import { ComponentWrapper } from "../atoms";
import { booleanOptions } from "./Question";
import { removeQuotes, uniqBy } from "../utils";
import {
  Change,
  MainWrapper,
  Question,
  QuestionWrapper,
  UserAnswer,
  UserResult,
  UserResultParagraph,
} from "./QuestionAnswerTableStyles";

export default ({ checker, onGoToQuestion }) => {
  const permitsPerQuestion = [];

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
      <MainWrapper>
        <Question strong>Vraag</Question>
        <UserAnswer strong>Uw antwoord</UserAnswer>
        {onGoToQuestion && <Change />}
      </MainWrapper>

      <ComponentWrapper marginBottom={40}>
        {checker.stack.map((question, questionIndex) => {
          const decisivePermits =
            uniqBy(permitsPerQuestion[questionIndex], "name") || [];

          return (
            <QuestionWrapper key={question.id}>
              <Question>{question.text}</Question>
              {question.options ? (
                <UserAnswer>{removeQuotes(question.answer)}</UserAnswer>
              ) : (
                <UserAnswer>
                  {
                    booleanOptions.find(
                      (option) => option.value === question.answer
                    ).label
                  }
                </UserAnswer>
              )}
              {onGoToQuestion && (
                <Change>
                  <Button
                    onClick={() => onGoToQuestion(questionIndex)}
                    variant="textButton"
                  >
                    Wijzig
                  </Button>
                </Change>
              )}
              {decisivePermits.map((permit, index) => (
                <UserResult key={`${permit} ${index}`}>
                  <Icon
                    color={themeColor("secondary", "main")}
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
      </ComponentWrapper>
    </>
  );
};
