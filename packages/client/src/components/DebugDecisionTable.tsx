/* eslint-disable */
/* istanbul ignore file */
import { Accordion } from "@amsterdam/asc-ui";
import { Checker } from "imtr_client";
import Question from "imtr_client/src/models/question";
import React, { useContext } from "react";

import { Topic } from "../config";
import { SessionContext, SessionDataType } from "../context";
import HiddenDebugInfo from "./HiddenDebugInfo";

const QuestionSummary: React.FC<{ question: Question }> = ({
  question: { prio, autofill, text },
}) => (
  <>
    {prio} : {autofill ? `[${autofill}]` : ""} {text}
  </>
);

const Answer: React.FC<{ question: Question }> = ({ question: { answer } }) => (
  <>
    {answer === null ? (
      "NULL"
    ) : (
      <b>{answer !== undefined ? answer.toString() : "..."}</b>
    )}
  </>
);

type DebugDecisionTableProps = {
  checker: Checker;
  topic: Topic;
};

const DebugDecisionTable: React.FC<DebugDecisionTableProps> = ({
  checker,
  topic,
}) => {
  const sessionContext = useContext<SessionDataType>(SessionContext);
  const { slug } = topic;
  const { questionIndex } = sessionContext[slug];
  const decisionId = "dummy";

  if (!checker || !checker.permits) {
    return <></>;
  }
  const allQuestions = checker._getAllQuestions();
  const autofilled = allQuestions.filter((q: Question) => q.autofill);

  return (
    <HiddenDebugInfo>
      <Accordion title="Debug Decision Table:">
        <div style={{ display: "block" }}>
          {autofilled.filter((q: Question) => q.autofill).length > 0 && (
            <>
              <h1>Autofill</h1>
              {autofilled.map((q: Question) => (
                <p key={q.id}>
                  <QuestionSummary question={q} />: <Answer question={q} />
                </p>
              ))}
            </>
          )}

          <h1>Stack</h1>
          <table cellPadding="1" cellSpacing="1">
            <thead>
              <tr>
                <th>Vraag</th>
                <th>Antwoord</th>
              </tr>
            </thead>
            <tbody>
              {checker.stack.map((q: Question, i: number) => (
                <tr
                  key={`question-${q.id}-${i}`}
                  style={{
                    fontWeight:
                      checker.stack[questionIndex] === q ? "bold" : "normal",
                  }}
                >
                  <td>
                    <QuestionSummary question={q} />
                  </td>
                  <td>
                    <Answer question={q} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h1>Upcoming (user) questions</h1>
        <table cellPadding="1" cellSpacing="1">
          <thead>
            <tr>
              <th>Vraag</th>
              <th>Antwoord</th>
            </tr>
          </thead>
          <tbody>
            {checker._getUpcomingQuestions().map((q: Question, i: number) => (
              <tr key={`open-${q.id}-${i}`}>
                <td>
                  <QuestionSummary question={q} />
                </td>
                <td>
                  <em>
                    <Answer question={q} />
                  </em>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h1>Permits</h1>
        {checker.permits.map((permit: any, index: number) => {
          const conclusionString = permit.getOutputByDecisionId(decisionId);
          const conclusion = permit.getDecisionById(decisionId);
          const decisiveDecisions = conclusion.getDecisiveInputs();

          return (
            <div key={`${permit.name} - ${index}`}>
              <h2>
                {permit.name} (v{permit.version})
              </h2>
              {permit.decisions
                .sort(
                  // loosely order decisions based on their question prios
                  // doesn't matter if it's 100% correct
                  (a: any, b: any) =>
                    a.getQuestions()[0]?.prio - b.getQuestions()[0]?.prio
                )
                .map((decision: any, i: number) => {
                  const matchingRules = decision.getMatchingRules();
                  const rules = decision.rules;
                  const questions = decision.inputs;
                  const decisiveInputs = decision.getDecisiveInputs();
                  return (
                    <div key={`descicion - ${decision.id} ${i}`}>
                      <h3>
                        Decision {decision.id === "dummy" ? decision.id : i} (
                        {matchingRules.length !== 0 && "CONCLUSIVE"})
                      </h3>
                      <div style={{ marginLeft: "2em" }}>
                        <div>
                          <strong>Vragen</strong>
                          <ol>
                            {questions.map((q: Question) => (
                              <li
                                key={q.id}
                                style={{
                                  fontWeight:
                                    decisiveInputs.indexOf(q) > -1
                                      ? "bold"
                                      : "normal",
                                }}
                              >
                                {q.text}
                                <br />
                                Antwoord: <Answer question={q} />
                              </li>
                            ))}
                          </ol>
                        </div>
                        <div>
                          <strong>Rules:</strong>
                          <ol>
                            {rules.map((r: any) => {
                              return (
                                <li
                                  key={r.inputConditions + r.outputValue}
                                  style={{
                                    fontWeight:
                                      matchingRules.indexOf(r) > -1
                                        ? "bold"
                                        : "normal",
                                  }}
                                >
                                  inputConditions:{" "}
                                  {JSON.stringify(r.inputConditions)}
                                  <br />
                                  outputValue: {r.outputValue}
                                </li>
                              );
                            })}
                          </ol>
                        </div>
                      </div>
                    </div>
                  );
                })}

              <p>
                <b>{conclusionString || <em>[unknown]</em>}</b>
                .<br />
                {decisiveDecisions.map((decision: any) =>
                  decision
                    .getDecisiveInputs()
                    .map((question: any) => question.text)
                )}
              </p>
            </div>
          );
        })}
      </Accordion>
    </HiddenDebugInfo>
  );
};

export default DebugDecisionTable;
