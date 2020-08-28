import { Column, FormTitle, Row } from "@datapunt/asc-ui";
import React, { useContext } from "react";
import { Helmet } from "react-helmet";

import { HideForPrint } from "../../atoms";
import { Topic } from "../../config";
import { CheckerContext } from "../../context";
import Footer from "../Footer";
import Header from "../Header";
import HiddenDebugInfo from "../HiddenDebugInfo";
import { Container, Content, ContentContainer } from "./BaseLayoutStyles";

export interface BaseLayoutProps {
  children: React.ReactNode;
  heading: String;
  checker?: object;
}

function BaseLayout({ children, checker, heading }: BaseLayoutProps) {
  const checkerContext = useContext(CheckerContext);
  const topic: Topic = checkerContext.topic; // topic can be null here.
  const title = heading || topic?.text.heading;

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
      </ContentContainer>

      <HideForPrint>
        <HiddenDebugInfo title="Environment">
          <p>GraphQL: {process.env.REACT_APP_GRAPHQL_API_URL}</p>
          <p>App Version: {process.env.REACT_APP_VERSION}</p>
          <p>Node environment: {process.env.NODE_ENV}</p>
        </HiddenDebugInfo>
        {topic && (
          <HiddenDebugInfo title="checkerContext.topic">
            <p>slug: {topic.slug}</p>
            <p>redirectToOlo: {JSON.stringify(topic.redirectToOlo)}</p>
            <p>hasSTTR: {JSON.stringify(topic.hasSTTR)}</p>
          </HiddenDebugInfo>
        )}
        {checkerContext.checker && (
          <HiddenDebugInfo title="checkerContext.checker">
            {JSON.stringify(checkerContext.checker)}
          </HiddenDebugInfo>
        )}

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
      </HideForPrint>
    </Container>
  );
}

export default BaseLayout;
