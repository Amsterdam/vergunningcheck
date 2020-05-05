import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { Row, Column } from "@datapunt/asc-ui";
import {
  Container,
  ContentContainer,
  FormTitle,
  Content
} from "./BaseLayoutStyles";

import Context from "../../context";
import Header from "../Header";
import Footer from "../Footer";
import HiddenDebugInfo from "../HiddenDebugInfo";

export interface BaseLayoutProps {
  children: React.ReactNode;
  heading: String;
}

function BaseLayout({ children, heading }: BaseLayoutProps) {
  const { topic } = useContext(Context);
  const title = heading || topic?.text?.heading || null;

  // const showNavLink = !topic || !topic.sttrPath;
  const showNavLink = false;

  return (
    <Container>
      <Helmet>
        <title>Amsterdam Vergunningchecker</title>
      </Helmet>
      <Header showLinks={showNavLink} />
      <ContentContainer>
        <Row>
          <Column
            wrap
            span={{
              small: 1,
              medium: 2,
              big: 5,
              large: 9,
              xLarge: 9
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
            <p>redirectToOlo: {JSON.stringify(!!topic.redirectToOlo)}</p>
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
            -->`
        }}
      />
    </Container>
  );
}

export default BaseLayout;
