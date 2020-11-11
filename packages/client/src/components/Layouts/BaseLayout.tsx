import { Column, FormTitle, Heading, Row } from "@amsterdam/asc-ui";
import React from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import { HideForPrint } from "../../atoms";
import { Topic } from "../../config";
import { findTopicBySlug } from "../../utils";
import DebugVariables from "../DebugVariables";
import Footer from "../Footer";
import Header from "../Header";
import { Container, Content, ContentContainer } from "./BaseLayoutStyles";

export type BaseLayoutProps = {
  heading?: String;
  formTitle?: String;
};

const BaseLayout: React.FC<BaseLayoutProps> = ({
  children,
  heading: headingProp,
  formTitle: formTitleProp,
}) => {
  const { slug } = useParams<{ slug: string }>();
  const topic = findTopicBySlug(slug) as Topic;
  const { hasIMTR, name, text } = topic || {};
  const formTitle = formTitleProp || text?.heading;

  const heading = hasIMTR && name ? name : headingProp;

  return (
    <Container>
      <Helmet>
        <title>Amsterdam Vergunningcheck</title>
      </Helmet>
      <Header />
      <ContentContainer>
        <Row hasMargin={false}>
          <Column
            wrap
            span={{
              small: 1,
              medium: 2,
              big: 5,
              large: 9,
              xLarge: 9,
            }}
          >
            <Content>
              {formTitle && <FormTitle>{formTitle}</FormTitle>}
              {heading && (
                <Heading forwardedAs="h2" gutterBottom={16} styleAs="h1">
                  {heading}
                </Heading>
              )}
              {children}

              <HideForPrint>
                <DebugVariables />
              </HideForPrint>
            </Content>
          </Column>
        </Row>
      </ContentContainer>

      <HideForPrint>
        <Footer />
        <div
          // comment to see app version and environment
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `<!--
            Node environment: ${process.env.NODE_ENV}
            App Version: ${process.env.REACT_APP_VERSION}
            Branch: ${process.env.REACT_APP_GIT_BRANCH}
            Commit: https://github.com/Amsterdam/vergunningcheck/commit/${process.env.REACT_APP_GIT_SHA}
            GraphQL: ${process.env.REACT_APP_GRAPHQL_API_URL}
            -->`,
          }}
        />
      </HideForPrint>
    </Container>
  );
};

export default BaseLayout;
