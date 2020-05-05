/* eslint-disable */
import React from "react";
import HiddenDebugInfo from "./HiddenDebugInfo";

export default ({ checker }) => {
  const decisionId = "dummy";
  window.checker = checker;
  if (!checker || !checker.permits) return <></>;
  const relevantOpenQuestions = checker._getUpcomingQuestions();
  return (
    <HiddenDebugInfo>
      <div style={{ display: "block" }}>
        <h1>Questions</h1>
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
                    checker.stack[checker.stack.length - 1] === q
                      ? "bold"
                      : "normal",
                }}
              >
                <td>
                  {q.prio}: {q.text}
                </td>
                <td>{q.answer !== undefined && q.answer.toString()}</td>
              </tr>
            ))}
            {relevantOpenQuestions.map((q, i) => (
              <tr key={`open-${q.id}-${i}`}>
                <td>
                  {q.prio}: {q.text}
                </td>
                <td>
                  <em>
                    {q.answer !== undefined ? q.answer.toString() : "..."}
                  </em>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
                              Antwoord:{" "}
                              {q.answer !== undefined ? (
                                <b>{JSON.stringify(q.answer)}</b>
                              ) : (
                                <em>undefined</em>
                              )}
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
            <h3>Notes:</h3>
            {conclusionMatchingRules.map(
              ({ description, inputConditions, outputValue }) => (
                <p key={{ inputConditions, outputValue }}>- {description}</p>
              )
            )}
          </div>
        );
      })}
    </HiddenDebugInfo>
  );
};
