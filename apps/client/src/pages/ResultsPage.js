import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Paragraph, Button } from "@datapunt/asc-ui";
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
  Wrapper,
  MainWrapper,
  Question,
  UserAnswer,
  UserResult,
  Change,
} from "./ResultsPageStyles";
import Helmet from "react-helmet";
import Context from "../context";

const ResultsPage = ({ topic, checker }) => {
  const history = useHistory();
  const context = useContext(Context);
  const { slug } = topic;
  const permitsPerQuestion = [];

  const onGoToQuestion = (index) => {
    const q = checker.rewindTo(index);
    context.setData({ questionId: index });
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
          <Question>Vraag</Question>
          <UserAnswer>Uw antwoord</UserAnswer>
          <Change />
        </MainWrapper>
        {checker?.stack?.map((question, index) => {
          const isDecisiveForPermits =
            uniqBy(permitsPerQuestion[index], "name") || [];

          return (
            <div key={question.id}>
              {(typeof question.answer === "boolean" ||
                typeof question.answer === "string") && (
                <Wrapper>
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
                  <Button
                    onClick={() => onGoToQuestion(index)}
                    variant="textButton"
                  >
                    Wijzig
                  </Button>
                </Wrapper>
              )}

              {isDecisiveForPermits.map((permit) => (
                <UserResult key={permit}>
                  <Alert
                    style={{
                      width: "20%",
                      maxWidth: "30px",
                      marginBottom: "8px",
                      fill: "#ec0000",
                    }}
                  />
                  <p
                    style={{
                      marginBottom: "25px",
                      marginLeft: "7px",
                      display: "inline-block",
                    }}
                  >
                    Op basis van dit antwoord bent u vergunningplichtig voor{" "}
                    {permit.name.replace("Conclusie", "").toLowerCase()}
                  </p>
                </UserResult>
              ))}
            </div>
          );
        })}
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
