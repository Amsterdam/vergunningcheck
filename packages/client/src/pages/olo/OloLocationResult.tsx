import { Heading, Paragraph } from "@amsterdam/asc-ui";
import React, { Suspense, useContext } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

import Form from "../../components/Form";
import Layout from "../../components/Layouts/DefaultLayout";
import Loading from "../../components/Loading";
import { LocationSummary } from "../../components/Location/";
import Nav from "../../components/Nav";
import { Topic, generateOloUrl } from "../../config";
import { actions, eventNames } from "../../config/matomo";
import { SessionContext, SessionDataType } from "../../context";
import withChecker from "../../hoc/withChecker";
import withTracking from "../../hoc/withTracking";
import { geturl, routes } from "../../routes";
import { LOCATION_RESULT } from "../../utils/test-ids";

export type OloLocationResultProps = {
  matomoTrackEvent: Function;
  topic: Topic;
};

const OloLocationResult: React.FC<OloLocationResultProps> = ({
  matomoTrackEvent,
  topic,
}) => {
  const sessionContext = useContext<SessionDataType & { setSessionData?: any }>(
    SessionContext
  );
  const history = useHistory();

  const { text } = topic;
  const address = sessionContext[topic.slug].address;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    matomoTrackEvent({
      action: actions.CLICK_EXTERNAL_NAVIGATION,
      name: eventNames.TO_OLO,
    });
    window.open(generateOloUrl(address), "_blank");
  };

  const goToPrev = () => {
    history.push(geturl(routes.oloLocationInput, topic));
  };

  return (
    <Layout heading={text.heading}>
      <Helmet>
        <title>Inleiding - {text.heading}</title>
      </Helmet>
      <Suspense fallback={<Loading />}>
        <Form data-testid={LOCATION_RESULT} onSubmit={onSubmit}>
          <Heading forwardedAs="h3">Adresgegevens</Heading>
          <LocationSummary
            showTitle
            {...{
              topic,
            }}
          />
          <Paragraph gutterBottom={0}>
            U hebt deze informatie nodig om de vergunningcheck te doen op het
            Omgevingsloket.
          </Paragraph>
          <Nav
            formEnds
            nextText={"Naar het omgevingsloket"}
            noMarginBottom
            onGoToPrev={goToPrev}
            showNext
            showPrev
          />
        </Form>
      </Suspense>
    </Layout>
  );
};

export default withTracking(withChecker(OloLocationResult));
