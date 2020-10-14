/* eslint-disable */
/* istanbul ignore file */
import {
  Accordion,
  Card,
  CardContent,
  Heading,
  Link,
  Paragraph,
} from "@amsterdam/asc-ui";
import React, { useContext } from "react";

import { Topic } from "../config";
import { CheckerContext } from "../context";
import HiddenDebugInfo from "./HiddenDebugInfo";

type DebugVariablesProps = {};

const DebugVariables: React.FC<DebugVariablesProps> = () => {
  const checkerContext = useContext(CheckerContext);
  const topic = checkerContext.topic as Topic; // topic can be null here.
  return (
    <HiddenDebugInfo>
      <Accordion title="Debug Variables:">
        <Card backgroundColor="level2" shadow>
          <CardContent>
            <Heading forwardedAs="h2">Environment</Heading>
            <Paragraph>Node environment: {process.env.NODE_ENV}</Paragraph>
            {process.env.REACT_APP_JOB_NAME && (
              <Paragraph>Job name: {process.env.REACT_APP_JOB_NAME}</Paragraph>
            )}
            {process.env.REACT_APP_JENKINS_URL && (
              <Paragraph>
                Jenkins url: {process.env.REACT_APP_JENKINS_URL}
              </Paragraph>
            )}
            {process.env.REACT_APP_BUILD_URL && (
              <Paragraph>
                Build url: {process.env.REACT_APP_BUILD_URL}
              </Paragraph>
            )}
            {process.env.REACT_APP_BUILD_NUMBER && (
              <Paragraph>
                Build number: {process.env.REACT_APP_BUILD_NUMBER}
              </Paragraph>
            )}
            <Paragraph>App Version: {process.env.REACT_APP_VERSION}</Paragraph>
            {process.env.REACT_APP_GIT_BRANCH && (
              <Paragraph>
                Branch:{" "}
                <Link
                  href={`https://github.com/Amsterdam/vergunningcheck/tree/${process.env.REACT_APP_GIT_BRANCH}`}
                  target="_blank"
                >
                  {process.env.REACT_APP_GIT_BRANCH}
                </Link>
              </Paragraph>
            )}
            {process.env.REACT_APP_GIT_SHA && (
              <Paragraph>
                Commit:{" "}
                <Link
                  href={`https://github.com/Amsterdam/vergunningcheck/commit/${process.env.REACT_APP_GIT_SHA}`}
                  target="_blank"
                >
                  {process.env.REACT_APP_GIT_SHA}
                </Link>
              </Paragraph>
            )}
            <Paragraph>
              GraphQL: {process.env.REACT_APP_GRAPHQL_API_URL}
            </Paragraph>
          </CardContent>
        </Card>

        {topic && (
          <Card backgroundColor="level2" shadow>
            <CardContent>
              <Heading forwardedAs="h2">topic from checkerContext</Heading>
              <Paragraph>slug: {topic.slug}</Paragraph>
              <Paragraph>
                redirectToOlo: {JSON.stringify(topic.redirectToOlo)}
              </Paragraph>
              <Paragraph>hasIMTR: {JSON.stringify(topic.hasIMTR)}</Paragraph>
            </CardContent>
          </Card>
        )}

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
