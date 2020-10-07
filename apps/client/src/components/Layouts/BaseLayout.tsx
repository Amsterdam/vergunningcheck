import { Column, FormTitle, Row } from "@amsterdam/asc-ui";
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
  checker?: object;
  children: React.ReactNode;
  heading: String;
}

function BaseLayout({ children, heading }: BaseLayoutProps) {
  const checkerContext = useContext(CheckerContext);
  const topic = checkerContext.topic as Topic; // topic can be null here.
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
              big: 5,
              large: 9,
              xLarge: 9,
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
          <HiddenDebugInfo title="topic from checkerContext">
            <p>slug: {topic.slug}</p>
            <p>redirectToOlo: {JSON.stringify(topic.redirectToOlo)}</p>
            <p>hasIMTR: {JSON.stringify(topic.hasIMTR)}</p>
          </HiddenDebugInfo>
        )}
        {checkerContext.checker && (
          // istanbul ignore next
          <HiddenDebugInfo title="permits from checkerContext">
            {checkerContext.checker?.permits?.map((permit: any) => {
              /* istanbul ignore next */
              return <p key={permit.name}>{permit.name}</p>;
            })}
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
