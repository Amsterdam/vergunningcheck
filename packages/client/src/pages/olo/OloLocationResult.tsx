import { Heading, Paragraph } from "@amsterdam/asc-ui";
import React, { FormEvent, FunctionComponent, Suspense } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

import Form from "../../components/Form";
import { TopicLayout } from "../../components/Layouts";
import Loading from "../../components/Loading";
import { LocationSummary } from "../../components/Location/";
import Nav from "../../components/Nav";
import { generateOloUrl } from "../../config";
import { actions, eventNames, sections } from "../../config/matomo";
import { useTopic, useTopicData, useTracking } from "../../hooks";
import { geturl, routes } from "../../routes";
import { LOCATION_RESULT } from "../../utils/test-ids";

const OloLocationResult: FunctionComponent = () => {
  const topic = useTopic();
  const history = useHistory();
  const { topicData } = useTopicData();
  const { matomoTrackEvent } = useTracking();

  const { text } = topic;
  const { address } = topicData;

  // This is to prevent a bug when the Session Storage data is manually cleared
  if (!address) {
    history.replace(geturl(routes.oloLocationInput, topic));
    return null;
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    matomoTrackEvent({
      action: actions.CLICK_EXTERNAL_NAVIGATION,
      name: eventNames.TO_OLO,
    });
    window.open(generateOloUrl(address), "_blank");
  };

  const goToPrev = () => {
    matomoTrackEvent({
      action: actions.CLICK_INTERNAL_NAVIGATION,
      name: `${eventNames.BACK} ${sections.LOCATION_INPUT}`,
    });
    history.push(geturl(routes.oloLocationInput, topic));
  };

  return (
    <TopicLayout>
      <Helmet>
        <title>Adresgegevens - {text.heading}</title>
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
          <Paragraph gutterBottom={8} strong>
            Dit hebt u nodig
          </Paragraph>
          <Paragraph>
            De informatie over het gebouw die hierboven staat hebt u nodig voor
            het doen van de vergunningcheck. Weet u al precies wat u gaat
            bouwen? Houd dan uw bouwplannen ook bij de hand. Ook als uw plannen
            nog niet klaar zijn, kunt u alvast de vergunningcheck doen. U kunt
            dan zien waar u op moet letten.
          </Paragraph>
          <Paragraph gutterBottom={8} strong>
            Naar het Omgevingsloket
          </Paragraph>
          <Paragraph>
            U doet deze vergunningcheck niet op de website van de gemeente, maar
            op een andere site: die van het landelijk Omgevingsloket. Via
            onderstaande knop gaat u daarheen.
          </Paragraph>
          <Nav
            formEnds
            nextText={"Naar het Omgevingsloket"}
            noMarginBottom
            onGoToPrev={goToPrev}
            showNext
            showPrev
          />
        </Form>
      </Suspense>
    </TopicLayout>
  );
};

export default OloLocationResult;
