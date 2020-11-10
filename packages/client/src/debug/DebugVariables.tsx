import {
  Accordion,
  Card,
  CardContent,
  Heading,
  Link,
  Paragraph,
} from "@amsterdam/asc-ui";
import React, { useContext } from "react";

import { CheckerContext } from "../CheckerContext";
import HiddenDebugInfo from "../components/HiddenDebugInfo";
import { useSession, useSlug, useTopic, useTopicData } from "../hooks";
import { defaultTopicSession } from "../SessionContext";
import { Debug } from ".";

type DebugVariablesProps = {};

const DebugVariables: React.FC<DebugVariablesProps> = () => {
  const slug = useSlug();
  const topic = useTopic();
  const { session, setSession } = useSession();
  const { topicData, setTopicData } = useTopicData();
  const checkerContext = useContext(CheckerContext);

  // Do not render when testing with Jest
  if (process.env.JEST_WORKER_ID) {
    return null;
  }

  // Array.from(process.env)
  const ENV = process.env as { [key: string]: string | undefined };

  return (
    <HiddenDebugInfo>
      <Accordion title="Debug informatie">
        <Card backgroundColor="level2" shadow>
          <CardContent>
            <Heading forwardedAs="h2">Checker context</Heading>
            <Debug json={checkerContext} condensed />
          </CardContent>
        </Card>

        <Card backgroundColor="level2" shadow>
          <CardContent>
            <Heading forwardedAs="h2">Topic Data</Heading>
            <Debug json={topicData} />
            <button
              onClick={() => {
                setTopicData({
                  finishedComponents: ["locatie invoer"],
                  activeComponents: ["vragen"],
                  address: {
                    __typename: "Address",
                    restrictions: [
                      { __typename: "Monument", name: "Gemeentelijk monument" },
                    ],
                    zoningPlans: [
                      {
                        __typename: "zoningPlan",
                        name: "Paraplubestemmingsplan Stadsdeel West",
                      },
                      {
                        __typename: "zoningPlan",
                        name: "Aanpassen geluidzone Westpoort en Hoogtij",
                      },
                      {
                        __typename: "zoningPlan",
                        name: "Landlust en Gibraltarbuurt",
                      },
                      {
                        __typename: "zoningPlan",
                        name: "Drijvende bouwwerken",
                      },
                    ],
                    id: "MDM2MzAxMDAxMjA2MjA2NA==",
                    streetName: "Louise de Colignystraat",
                    postalCode: "1055XD",
                    houseNumber: 19,
                    houseNumberFull: "19 C",
                    residence: "Amsterdam",
                  },
                });
              }}
            >
              update topic
            </button>
          </CardContent>
        </Card>

        <Card backgroundColor="level2" shadow>
          <CardContent>
            <Heading forwardedAs="h2">Session</Heading>
            <Debug json={session} />
            <button
              onClick={() => {
                setSession({ fake1: defaultTopicSession });
                setSession({ fake2: defaultTopicSession });
              }}
            >
              update session
            </button>
          </CardContent>
        </Card>

        {topic && (
          <Card backgroundColor="level2" shadow>
            <CardContent>
              <Heading forwardedAs="h2">Topic</Heading>
              <Debug json={topic} />
            </CardContent>
          </Card>
        )}

        <Card backgroundColor="level2" shadow>
          <CardContent>
            <HiddenDebugInfo title="Environment">
              <Heading forwardedAs="h2">process.env</Heading>
              <code>
                <pre>
                  {Object.entries(ENV).map(([key, value]) => (
                    <span key={key}>
                      {key}:{" "}
                      {(() => {
                        switch (key) {
                          case "REACT_APP_GIT_SHA":
                            return (
                              <Link
                                href={`https://github.com/Amsterdam/vergunningcheck/commit/${value}`}
                                target="_blank"
                              >
                                {value}
                              </Link>
                            );
                          case "REACT_APP_GRAPHQL_API_URL":
                            return (
                              <Link href={value} target="_blank">
                                {value}
                              </Link>
                            );
                          case "REACT_APP_GIT_BRANCH":
                            return (
                              <Link
                                href={`https://github.com/Amsterdam/vergunningcheck/tree/${value}`}
                                target="_blank"
                              >
                                {value}
                              </Link>
                            );
                          default: {
                            return value;
                          }
                        }
                      })()}
                      {`\n`}
                    </span>
                  ))}
                </pre>
              </code>
            </HiddenDebugInfo>
          </CardContent>
        </Card>

        <Card backgroundColor="level2" shadow>
          <CardContent>
            <Heading forwardedAs="h2">useSlug</Heading>
            <Debug json={slug} />
          </CardContent>
        </Card>

        {checkerContext.checker && (
          <Card backgroundColor="level2" shadow>
            <CardContent>
              <Heading forwardedAs="h2">permits from checkerContext</Heading>
              {checkerContext.checker?.permits?.map((permit: any) => {
                return <Paragraph key={permit.name}>{permit.name}</Paragraph>;
              })}
            </CardContent>
          </Card>
        )}
      </Accordion>
    </HiddenDebugInfo>
  );
};

export default DebugVariables;
