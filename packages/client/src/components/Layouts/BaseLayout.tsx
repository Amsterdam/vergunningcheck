import { Column, Row } from "@amsterdam/asc-ui";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

import { HideForPrint } from "../../atoms";
import { useTracking } from "../../hooks";
import Footer from "../Footer";
import Header from "../Header";
import { Container, Content, ContentContainer } from "./BaseLayoutStyles";

type BaseLayoutProps = {
  disablePageView?: boolean;
};

const BaseLayout: React.FC<BaseLayoutProps> = ({
  children,
  disablePageView,
}) => {
  const { matomoPageView } = useTracking();
  const { location } = useHistory();

  useEffect(() => {
    if (!disablePageView) {
      matomoPageView();
    }
    // @TODO: We need to fix this!
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
            <Content>{children}</Content>
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
