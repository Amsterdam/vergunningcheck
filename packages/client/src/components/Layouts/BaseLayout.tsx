import { Column, FormTitle, Row } from "@amsterdam/asc-ui";
import React, { useContext } from "react";
import { Helmet } from "react-helmet";

import { HideForPrint } from "../../atoms";
import { Topic } from "../../config";
import { CheckerContext } from "../../context";
import DebugVariables from "../DebugVariables";
import Footer from "../Footer";
import Header from "../Header";
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
}

export default BaseLayout;
