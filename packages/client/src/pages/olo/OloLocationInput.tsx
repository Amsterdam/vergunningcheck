import React, { FunctionComponent, Suspense } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { TopicLayout } from "../../components/Layouts";
import Loading from "../../components/Loading";
import { LocationInput } from "../../components/Location/";
import { useTopic } from "../../hooks";
import { geturl, routes } from "../../routes";

const OloLocationInput: FunctionComponent = () => {
  const topic = useTopic();
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <TopicLayout>
      <Helmet>
        <title>
          {t("location.enter location")} - {topic.text.heading}
        </title>
      </Helmet>
      <Suspense fallback={<Loading />}>
        <LocationInput
          handleNewAddressSubmit={() => {
            history.push(geturl(routes.oloLocationResult, topic));
          }}
        />
      </Suspense>
    </TopicLayout>
  );
};

export default OloLocationInput;
