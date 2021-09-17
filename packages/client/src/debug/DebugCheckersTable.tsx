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
      <StyledHeading forwardedAs="h2">Vergunningchecks</StyledHeading>
      <ul>
        {topics
          .filter((topic) => topic.hasIMTR)
          .map((topic) => (
            <li key={topic.slug}>
              <Link to={geturl(routes.start, topic)}>{topic.name}</Link>
            </li>
          ))}
      </ul>
      <StyledHeading forwardedAs="h2">
        Vergunningchecks die naar het OLO leiden
      </StyledHeading>
      <ul>
        {topics
          .filter(({ hasIMTR }) => !hasIMTR) // only show olo
          .map(({ slug, name }) => (
            <li key={slug}>
              <Link to={geturl(routes.start, { slug })}>{name}</Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default DebugCheckersTable;
