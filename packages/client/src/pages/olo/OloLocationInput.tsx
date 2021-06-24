import React, { FunctionComponent, Suspense } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { Loading } from "../../atoms";
import { TopicLayout } from "../../components/Layouts";
import { LocationInput } from "../../components/Location/";
import { useTopic } from "../../hooks";
import { geturl, routes } from "../../routes";
import { GraphQLTopic } from "../../types";

const OloLocationInput: FunctionComponent = () => {
  const topic = useTopic();

  const history = useHistory();
  const { t } = useTranslation();

  if (!topic) {
    return <Loading />;
  }
  const { text } = topic as GraphQLTopic;

  return (
    <TopicLayout>
      <Helmet>
        <title>
          {t("location.address.enter address")} - {text.heading}
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
