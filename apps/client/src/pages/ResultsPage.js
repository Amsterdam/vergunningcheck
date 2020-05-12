import React from "react";
import { useHistory } from "react-router-dom";
import { Paragraph, Button, Icon } from "@datapunt/asc-ui";
import { Alert } from "@datapunt/asc-assets";
import uniqBy from "lodash.uniqby";

import withFinalChecker from "../hoc/withFinalChecker";
import { routes, geturl, getslug } from "../routes";
import { RESULTS_PAGE } from "../utils/test-ids";
import Layout from "../components/Layouts/DefaultLayout";
import Form from "../components/Form";
import Nav from "../components/Nav";
import DebugDecisionTable from "../components/DebugDecisionTable";
import { booleanOptions } from "../components/Question";
import {
  QuestionWrapper,
  MainWrapper,
  Question,
  UserAnswer,
  UserResult,
  UserResultParagraph,
  Change,
} from "./ResultsPageStyles";
import Helmet from "react-helmet";

const ResultsPage = ({ topic, checker }) => {
  const history = useHistory();
  const { slug } = topic;
  const permitsPerQuestion = [];

  const onGoToQuestion = (index) => {
    const q = checker.rewindTo(index);
    history.push(
      geturl(routes.questions, {
        slug,
        question: getslug(q.text),
      })
    );
  };

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
    <Layout>
      <Helmet>
        <title>Uitkomsten - {topic.text.heading}</title>
      </Helmet>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          history.push(geturl(routes.conclusion, { slug }));
        }}
        data-testid={RESULTS_PAGE}
      >
        <Paragraph strong>
          Hieronder kunt u per vraag uw gegeven antwoord teruglezen en eventueel
          wijzigen. Als u een wijziging doet moet u misschien enkele vragen
          opnieuw beantwoorden.
        </Paragraph>

        <MainWrapper>
          <Question strong>Vraag</Question>
          <UserAnswer strong>Uw antwoord</UserAnswer>
          <Change />
        </MainWrapper>

        <div>
          {checker?.stack?.map((question, index) => {
            const isDecisiveForPermits =
              uniqBy(permitsPerQuestion[index], "name") || [];
            return (
              <QuestionWrapper key={question.id}>
                <Question>{question.text}</Question>
                {question.options ? (
                  <UserAnswer>
                    {question.answer.replace(/['"]+/g, "")}
                  </UserAnswer>
                ) : (
                  <UserAnswer>
                    {
                      booleanOptions.find(
                        (option) => option.value === question.answer
                      ).label
                    }
                  </UserAnswer>
                )}
                <Change>
                  <Button
                    onClick={() => onGoToQuestion(index)}
                    variant="textButton"
                  >
                    Wijzig
                  </Button>
                </Change>

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

        <Nav
          onGoToPrev={() => onGoToQuestion(checker.stack.length - 1)}
          showPrev
          showNext
        />
        <DebugDecisionTable checker={checker} />
      </Form>
    </Layout>
  );
};

export default withFinalChecker(ResultsPage);
