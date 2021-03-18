import { Accordion, Card, CardContent, Column, Row } from "@amsterdam/asc-ui";
import React, { FunctionComponent, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

import { HideForPrint } from "../../atoms";
import { DebugProcessVariables } from "../../debug";
import { useTracking } from "../../hooks";
import Footer from "../Footer";
import Header from "../Header";
import HiddenDebugInfo from "../HiddenDebugInfo";
import { Container, Content, ContentContainer } from "./BaseLayoutStyles";

type BaseLayoutProps = {
  disablePageView?: boolean;
};

const BaseLayout: FunctionComponent<BaseLayoutProps> = ({
  children,
  disablePageView,
}) => {
  const { matomoPageView } = useTracking();
  const { location } = useHistory();

  useEffect(() => {
    if (!disablePageView) {
      matomoPageView();
    }
    //eslint-disable-next-line
  }, [location.pathname]);

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
            <Content role="main">{children}</Content>
          </Column>
        </Row>
      </ContentContainer>

      <HideForPrint>
        {/* istanbul ignore if */}
        {!process.env.JEST_WORKER_ID && (
          // Don't render when testing
          <>
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

            <HiddenDebugInfo>
              <Accordion title="Process debug informatie">
                <Card backgroundColor="level2" shadow>
                  <CardContent>
                    <DebugProcessVariables />
                  </CardContent>
                </Card>
              </Accordion>
            </HiddenDebugInfo>
          </>
        )}

        <Footer />
      </HideForPrint>
    </Container>
  );
};

export default BaseLayout;
