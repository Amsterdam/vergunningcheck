import { Heading, Paragraph } from "@amsterdam/asc-ui";
import { themeSpacing } from "@amsterdam/asc-ui";
import { Button } from "@amsterdam/asc-ui";
import React, { FunctionComponent } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Alert } from "../atoms";
import { topics } from "../config";
import { geturl, routes } from "../routes";
import apiTopics from "../topics.json";
import { ApiTopic } from "../types";

const StyledHeading = styled(Heading)`
  margin: ${themeSpacing(4, 0, 2)};
`;

const findClientTopic = (apiTopic: ApiTopic) =>
  topics.find(({ slug }) => slug === apiTopic.slug);

const returnedData = (apiTopic: ApiTopic) => {
  const imtrTopic = topics.find(({ slug }) => slug === apiTopic.slug);

  const title = imtrTopic
    ? imtrTopic.name
    : apiTopic
    ? apiTopic.name || apiTopic.slug
    : "[ERROR]";
  return (
    <tr key={title}>
      <td>
        <Link to={geturl(routes.intro, apiTopic)}>{title}</Link>
      </td>
      <td>{imtrTopic ? "configured" : "single"}</td>
      <td>{apiTopic?.path?.split("/")[0]}</td>
      <td>
        <span onClick={() => alert(apiTopic.permits)}>
          {apiTopic.permits?.length}
        </span>
      </td>
    </tr>
  );
};

const DebugCheckersTable: FunctionComponent = () => {
  const [showChecks, setShowChecks] = useState(false);

  return (
    <>
      <Alert level="info" heading="Let op">
        <Paragraph>
          Deze pagina bevat links naar vergunningchecks die mogelijk (nog) niet
          correct werken. Als u niet bij de gemeente Amsterdam werkt dient u
          deze pagina niet te gebruiken.
        </Paragraph>
      </Alert>
      <br />
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <td>
              <strong>Name</strong>
            </td>
            <td>
              <strong>Type</strong>
            </td>
            <td>
              <strong>Folder</strong>
            </td>
            <td>
              <strong>#&nbsp;permits</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={4}>
              <StyledHeading forwardedAs="h2">Vergunningchecks</StyledHeading>
            </td>
          </tr>
          {apiTopics.map((apiTopic) =>
            apiTopic
              .filter(
                (apiTopic) => findClientTopic(apiTopic)?.isConfiguredPermitCheck
              )
              .map((apiTopic) => returnedData(apiTopic))
          )}

          <tr>
            <td colSpan={4}>
              <StyledHeading forwardedAs="h2">
                Vergunningchecks die naar het OLO leiden
              </StyledHeading>
            </td>
          </tr>
          {topics
            // Filter OLO flows topics (topics without IMTR file and are configured to be isPermitCheck)
            .filter(({ hasIMTR }) => !hasIMTR)
            .map((topic) => {
              const { slug, name } = topic;
              return (
                <tr key={slug}>
                  <td>
                    <Link to={geturl(slug)}>{name}</Link>
                  </td>
                  <td>OLO</td>
                  <td>n.a.</td>
                  <td>0</td>
                </tr>
              );
            })}

          <tr>
            <td colSpan={4}>
              <StyledHeading forwardedAs="h2">Formulieren</StyledHeading>
            </td>
          </tr>
          {apiTopics.map((apiTopic) =>
            apiTopic
              .filter((apiTopic) => findClientTopic(apiTopic)?.isPermitForm)
              .map((apiTopic) => returnedData(apiTopic))
          )}

          <tr>
            <td colSpan={4}>
              <StyledHeading forwardedAs="h2">
                Overige vergunningchecks
              </StyledHeading>
              {!showChecks && (
                <Button
                  onClick={() => setShowChecks(!showChecks)}
                  variant="tertiary"
                >
                  Toon alle losse checks uit de Builder
                </Button>
              )}
            </td>
          </tr>
          {showChecks &&
            apiTopics.map((apiTopic) =>
              apiTopic
                .filter((apiTopic) => !findClientTopic(apiTopic))
                .map((apiTopic) => returnedData(apiTopic))
            )}
        </tbody>
      </table>
    </>
  );
};

export default DebugCheckersTable;
