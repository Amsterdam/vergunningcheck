import { Accordion, Card, CardContent, Heading } from "@amsterdam/asc-ui";
import React, { FunctionComponent, useContext } from "react";

import Permit from "../../../imtr-client/src/models/permit";
import { CheckerContext } from "../CheckerContext";
import HiddenDebugInfo from "../components/HiddenDebugInfo";
import { useSession, useSlug, useTopic, useTopicData } from "../hooks";
import { defaultTopicSession } from "../SessionContext";
import { Debug } from ".";

type DebugVariablesProps = {};

const DebugVariables: FunctionComponent<DebugVariablesProps> = () => {
  const slug = useSlug();
  const topic = useTopic();
  const { session, setSession } = useSession();
  const { topicData, setTopicData } = useTopicData();
  const checkerContext = useContext(CheckerContext);

  // Do not render when testing with Jest
  if (process.env.JEST_WORKER_ID) {
    return null;
  }

  return (
    <HiddenDebugInfo>
      <Accordion title="Topic debug-informatie">
        <Card backgroundColor="level2" shadow>
          <CardContent>
            <Heading forwardedAs="h2">Summary</Heading>
            <p>
              current slug (slug): <strong>{slug}</strong>
            </p>

            <p>
              current topic (topicData): <strong>{topicData?.type}</strong>
            </p>

            <p>
              current topic (topic): <strong>{topic?.slug}</strong>
            </p>

            {checkerContext.checker && (
              <>
                <p>current checker:</p>
                <ul>
                  {checkerContext.checker?.permits?.map((permit: Permit) => {
                    return <li key={permit.name}>{permit.name}</li>;
                  })}
                </ul>
              </>
            )}
          </CardContent>
        </Card>

        <Card backgroundColor="level2" shadow>
          <CardContent>
            <Heading forwardedAs="h2">useChecker</Heading>
            <Debug json={checkerContext} condensed />
          </CardContent>
        </Card>

        {topic && (
          <Card backgroundColor="level2" shadow>
            <CardContent>
              <Heading forwardedAs="h2">useTopic</Heading>
              <Debug json={topic} />
            </CardContent>
          </Card>
        )}

        <Card backgroundColor="level2" shadow>
          <CardContent>
            <Heading forwardedAs="h2">useTopicData</Heading>
            <Accordion title="Toon topicData">
              <Debug json={topicData} />
              <button
                onClick={() =>
                  setTopicData({
                    finishedComponents: ["locatie invoer"],
                    activeComponents: ["vragen"],
                    questionIndex: 0,
                    answers: {},
                    address: {
                      __typename: "Address",
                      restrictions: [
                        {
                          __typename: "Monument",
                          name: "Gemeentelijk monument",
                        },
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
                      districtName: "Landlust",
                      neighborhoodName: "Landlust Noord",
                    },
                  })
                }
              >
                update topic
              </button>
            </Accordion>
          </CardContent>
        </Card>

        <Card backgroundColor="level2" shadow>
          <CardContent>
            <Heading forwardedAs="h2">useSession</Heading>
            <Accordion title="Toon session">
              <Debug json={session} />
              <button
                onClick={() => {
                  setSession({ fake1: defaultTopicSession });
                  setSession({ fake2: defaultTopicSession });
                }}
              >
                update session
              </button>
            </Accordion>
          </CardContent>
        </Card>

        <Card backgroundColor="level2" shadow>
          <CardContent>
            <Heading forwardedAs="h2">useSlug</Heading>
            <Debug json={slug} />
          </CardContent>
        </Card>
      </Accordion>
    </HiddenDebugInfo>
  );
};

export default DebugVariables;
