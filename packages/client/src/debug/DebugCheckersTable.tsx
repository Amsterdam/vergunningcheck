import { Heading, Paragraph } from "@amsterdam/asc-ui";
import { themeSpacing } from "@amsterdam/asc-ui";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Alert, Error } from "../atoms";
import { geturl, routes } from "../routes";
import { GraphQLTopic } from "../types";

const query = loader("../queries/Topics.graphql");


const StyledHeading = styled(Heading)`
  margin: ${themeSpacing(4, 0, 2)};
`;

const DebugCheckersTable: FunctionComponent = () => {
  const { loading, error, data } = useQuery<{
    topics: GraphQLTopic[];
  }>(query);

  if (loading) {
    return <p>Loading ...</p>;
  } else if (error) {
    return <Error stack={error.stack} content={error.message} />;
  }

  const { topics } = data as { topics: GraphQLTopic[] };

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
          <tr>
            <td colSpan={4}>
              <StyledHeading forwardedAs="h2">
                Vergunningchecks die naar het OLO leiden
              </StyledHeading>
            </td>
          </tr>
          {topics
            .filter((topic) => topic.hasIMTR)
            .map((topic) => (
              <tr key={topic.name}>
                <td>
                  <Link to={geturl(routes.start, topic)}>{topic.name}</Link>
                </td>
                <td>{/*topic.permits?.length */}</td>
              </tr>
            ))}
          <tr>
            <td colSpan={4}>
              <StyledHeading forwardedAs="h2">Formulieren</StyledHeading>
            </td>
          </tr>
          {topics
            .filter(({ hasIMTR }) => !hasIMTR) // only show olo
            .map(({ slug, name }) => (
              <tr key={slug}>
                <td>
                  <Link to={geturl(routes.start, { slug })}>{name}</Link>
                </td>
                <td>0</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default DebugCheckersTable;
