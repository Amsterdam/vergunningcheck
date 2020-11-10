import { Heading, Link, Paragraph } from "@amsterdam/asc-ui";
import { themeSpacing } from "@amsterdam/asc-ui";
import { Button } from "@amsterdam/asc-ui";
import React from "react";
import { useState } from "react";
import styled from "styled-components";

import { Alert } from "../atoms";
import { topics } from "../config";
import { geturl, routes } from "../routes";
import topicsJson from "../topics.json";

type topicProps = {
  path?: string;
  permits: string[];
  slug: string;
  name?: string;
};

const StyledHeading = styled(Heading)`
  margin: ${themeSpacing(4, 0, 2)};
`;

const hasIMTR = (apiTopic: topicProps) => {
  const imtrTopic = topics.find((topic) => topic.slug === apiTopic.slug);
  return imtrTopic && imtrTopic.hasIMTR;
};

const returnedData = (apiTopic: topicProps) => {
  const imtrTopic = topics.find((topic) => topic.slug === apiTopic.slug);

  const title = imtrTopic
    ? imtrTopic.name
    : apiTopic
    ? apiTopic.name || apiTopic.slug
    : "[ERROR]";
  return (
    <tr key={title}>
      <td>
        {imtrTopic && !imtrTopic.hasIMTR ? (
          <>
            {title}
            <br />
            <Alert level="attention">
              IMTR file found for <strong>{imtrTopic.name}</strong>, but we
              can't load '<strong>{imtrTopic.slug}</strong>' because it's
              configured to be{" "}
              <strong>
                {imtrTopic.redirectToOlo ? "redirectToOlo" : "olo"}
                -flow
              </strong>
              .
            </Alert>
          </>
        ) : (
          <Link href={geturl(routes.intro, apiTopic)} variant="inline">
            {title}
          </Link>
        )}
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

const DebugCheckersTable: React.FC = () => {
  const [showChecks, setShowChecks] = useState(false);

  return (
    <>
      <Alert level="attention" heading="Let op">
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
              <StyledHeading forwardedAs="h2">
                STTR flow (de Amsterdamse checks)
              </StyledHeading>
            </td>
          </tr>
          {topicsJson.map((apiConfig) => {
            return apiConfig
              .filter((apiTopic) => hasIMTR(apiTopic))
              .map((apiConfig) => returnedData(apiConfig));
          })}

          <tr>
            <td colSpan={4}>
              <StyledHeading forwardedAs="h2">OLO flow</StyledHeading>
            </td>
          </tr>
          {topics
            .filter(({ hasIMTR }) => !hasIMTR) // only show olo / redir-olo topics
            .map(({ slug, name, redirectToOlo }) => (
              <tr key={slug}>
                <td>
                  <Link
                    href={geturl(
                      redirectToOlo ? routes.oloRedirect : routes.intro,
                      { slug }
                    )}
                    variant="inline"
                  >
                    {name}
                  </Link>
                </td>
                <td>{redirectToOlo ? "Redirect" : "OLO"}</td>
                <td>n.a.</td>
                <td>0</td>
              </tr>
            ))}

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
            topicsJson.map((apiConfig) => {
              return apiConfig
                .filter((apiTopic) => !hasIMTR(apiTopic))
                .map((apiConfig) => returnedData(apiConfig));
            })}
        </tbody>
      </table>
    </>
  );
};

export default DebugCheckersTable;
