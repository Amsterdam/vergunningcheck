import { Column, Row } from "@datapunt/asc-ui";
import React, { useContext } from "react";
import { Helmet } from "react-helmet";

import { Debug, FormTitle, HideForPrint } from "../../atoms";
import { CheckerContext } from "../../CheckerContext";
import { useSession, useTopic } from "../../hooks";
import useTopicSession from "../../hooks/useTopicSession";
import { defaultTopicSession } from "../../SessionContext";
import Footer from "../Footer";
import Header from "../Header";
import HiddenDebugInfo from "../HiddenDebugInfo";
import { Container, Content, ContentContainer } from "./BaseLayoutStyles";

export interface BaseLayoutProps {
  children: React.ReactNode;
  heading?: String;
}

function BaseLayout({ children, heading }: BaseLayoutProps) {
  const checkerContext = useContext(CheckerContext);
  const [session, setSessionData] = useSession();
  const { topicData, setTopicData } = useTopicSession();
  const topic = useTopic();
  const title = heading || topic?.text?.heading || null;

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
        <HiddenDebugInfo title="Checker context">
          <Debug json={checkerContext} condensed />
        </HiddenDebugInfo>

        <HiddenDebugInfo title="Topic Data">
          <Debug json={topicData} />
          <button onClick={() => setTopicData({ activeComponents: ["blaat"] })}>
            update topic
          </button>
        </HiddenDebugInfo>

        <HiddenDebugInfo title="Session">
          <Debug json={session} />
          <button onClick={() => setSessionData({ slug: defaultTopicSession })}>
            reset session
          </button>
        </HiddenDebugInfo>

        {topic && (
          <HiddenDebugInfo title="Topic">
            <Debug json={topic} />
          </HiddenDebugInfo>
        )}

        <HiddenDebugInfo title="Environment">
          <Debug json={process.env} />
        </HiddenDebugInfo>

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
