import { Heading, Paragraph } from "@amsterdam/asc-ui";
import React, { FormEvent, FunctionComponent, Suspense } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { Form, Loading } from "../../atoms";
import { TopicLayout } from "../../components/Layouts";
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
  const { t } = useTranslation();

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
        <title>
          {t("location.address.heading")} - {text.heading}
        </title>
      </Helmet>
      <Suspense fallback={<Loading />}>
        <Form data-testid={LOCATION_RESULT} onSubmit={onSubmit}>
          <Heading forwardedAs="h3">{t("location.address.heading")}</Heading>
          <LocationSummary
            showTitle
            {...{
              topic,
            }}
          />
          <Paragraph gutterBottom={8} strong>
            {t("common.you may need this")}
          </Paragraph>
          <Paragraph>
            {t(
              "common.you need this information about your building when doing a permit check on OLO"
            )}
          </Paragraph>
          <Paragraph gutterBottom={8} strong>
            {t("common.to the olo")}
          </Paragraph>
          <Paragraph>
            {t("common.you need to do the permit check on the OLO")}
          </Paragraph>
          <Nav
            formEnds
            nextText={t("common.to the olo")}
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
