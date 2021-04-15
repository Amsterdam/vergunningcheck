import { Heading, Paragraph } from "@amsterdam/asc-ui";
import { themeSpacing } from "@amsterdam/asc-ui";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Alert } from "../atoms";
import Error from "../components/Error";
import { geturl, routes } from "../routes";
import { Topic } from "../types";

const query = loader("../queries/Topics.graphql");

// type topicProps = {
//   path?: string;
//   permits: string[];
//   slug: string;
//   name?: string;
// };

const StyledHeading = styled(Heading)`
  margin: ${themeSpacing(4, 0, 2)};
`;

const DebugCheckersTable: FunctionComponent = () => {
  const { loading, error, data } = useQuery<{
    topics: Topic[];
  }>(query);

  if (loading) {
    return <p>Loading ...</p>;
  } else if (error) {
    return <Error stack={error.stack} content={error.message} />;
  }

  const { topics } = data as { topics: Topic[] };

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
              <StyledHeading forwardedAs="h2">
                STTR flow (de Amsterdamse checks)
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
              <StyledHeading forwardedAs="h2">OLO flow</StyledHeading>
            </td>
          </tr>
          {topics
            .filter(({ hasIMTR }) => !hasIMTR) // only show olo / redir-olo topics
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
