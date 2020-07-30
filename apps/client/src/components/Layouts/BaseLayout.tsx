import { Column, FormTitle, Row } from "@datapunt/asc-ui";
import React, { useContext } from "react";
import { Helmet } from "react-helmet";

import { Flow } from "../../config";
import { CheckerContext } from "../../context";
import Footer from "../Footer";
import Header from "../Header";
import HiddenDebugInfo from "../HiddenDebugInfo";
import { Container, Content, ContentContainer } from "./BaseLayoutStyles";

export interface BaseLayoutProps {
  children: React.ReactNode;
  checker?: object;
  heading: String;
}

function BaseLayout({ children, checker, heading }: BaseLayoutProps) {
  const checkerContext = useContext(CheckerContext);
  const { topic } = checkerContext as any;
  const title = heading || topic?.text?.heading || null;

  return (
    <Container>
      <Helmet>
        <title>Amsterdam Vergunningcheck</title>
      </Helmet>
      <Header />
      <ContentContainer>
        <Row>
          <Column
            wrap
            span={{
              small: 1,
              medium: 2,
              big: checker ? 6 : 5,
              large: checker ? 12 : 9,
              xLarge: checker ? 12 : 9,
            }}
          >
            <Content>
              {title && <FormTitle>{title}</FormTitle>}
              {children}
            </Content>
          </Column>
        </Row>

        <HiddenDebugInfo title="Environment">
          <p>GraphQL: {process.env.REACT_APP_GRAPHQL_API_URL}</p>
          <p>App Version: {process.env.REACT_APP_VERSION}</p>
          <p>Node environment: {process.env.NODE_ENV}</p>
          <p>STTR stage: {process.env.REACT_APP_STTR_ENV}</p>
        </HiddenDebugInfo>
        {topic && (
          <HiddenDebugInfo title="Topic">
            <p>slug: {topic.slug}</p>
            <p>
              redir to olo: {JSON.stringify(topic.flow === Flow.oloRedirect)}
            </p>
            <p>sttrFile: {topic.sttrFile}</p>
          </HiddenDebugInfo>
        )}
      </ContentContainer>
      <Footer />
      <div
        // comment to see app version and environment
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `<!--
            Version: ${process.env.REACT_APP_VERSION}
            Environment: ${process.env.NODE_ENV}
            -->`,
        }}
      />
    </Container>
  );
}

export default BaseLayout;
