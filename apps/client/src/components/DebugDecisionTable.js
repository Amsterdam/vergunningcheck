/* eslint-disable */
import React, { useContext } from "react";

import { SessionContext } from "../context";
import HiddenDebugInfo from "./HiddenDebugInfo";

const QuestionSummary = ({ question: { prio, text, autofill } }) =>
  `${prio}: ${autofill ? ` [${autofill}]` : ""} ${text}`;

const Answer = ({ question: { answer } }) => (
  <>
    {answer === null ? (
      "NULL"
    ) : (
      <b>{answer !== undefined ? answer.toString() : "..."}</b>
    )}
  </>
);

export default ({ checker }) => {
  const sessionContext = useContext(SessionContext);
  const decisionId = "dummy";

  if (!checker || !checker.permits) return <></>;
  const allQuestions = checker._getAllQuestions();
  const autofilled = allQuestions.filter((q) => q.autofill);

  return (
    <HiddenDebugInfo>
      <div style={{ display: "block" }}>
        {autofilled.filter((q) => q.autofill).length > 0 && (
          <>
            <h1>Autofilled</h1>
            {autofilled.map((q) => (
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
            {checker.stack.map((q, i) => (
              <tr
                key={`question-${q.id}-${i}`}
                style={{
                  fontWeight:
                    checker.stack[sessionContext.questionIndex] === q
                      ? "bold"
                      : "normal",
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
          {checker._getUpcomingQuestions().map((q, i) => (
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
      {checker.permits.map((permit, index) => {
        const conclusionString = permit.getOutputByDecisionId(decisionId);
        const conclusion = permit.getDecisionById(decisionId);
        const conclusionMatchingRules = conclusion.getMatchingRules();
        const decisiveDecisions = conclusion.getDecisiveInputs();

        return (
          <div key={`${permit.name} - ${index}`}>
            <h2>{permit.name}</h2>
            {permit._decisions
              .sort(
                // loosely order decisions based on their question prios
                // doesn't matter if it's 100% correct
                (a, b) => a.getQuestions()[0]?.prio - b.getQuestions()[0]?.prio
              )
              .map((decision, i) => {
                const matchingRules = decision.getMatchingRules();
                const rules = decision._rules;
                const questions = decision._inputs;
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
                          {questions.map((q) => (
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
                          {rules.map((r) => {
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
              {decisiveDecisions.map((decision) =>
                decision.getDecisiveInputs().map((question) => question.text)
              )}
            </p>
          </div>
        );
      })}
    </HiddenDebugInfo>
  );
};
