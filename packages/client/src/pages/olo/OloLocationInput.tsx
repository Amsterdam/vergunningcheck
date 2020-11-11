import React, { Suspense } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

import Layout from "../../components/Layouts/DefaultLayout";
import Loading from "../../components/Loading";
import { LocationInput } from "../../components/Location/";
import { Topic } from "../../config";
import withChecker from "../../hoc/withChecker";
import withTracking, { MatomoTrackEventProps } from "../../hoc/withTracking";
import { geturl, routes } from "../../routes";

export type OloLocationInputProps = {
  topic: Topic;
};

const OloLocationInput: React.FC<
  OloLocationInputProps & MatomoTrackEventProps
> = ({ matomoTrackEvent, topic }) => {
  const history = useHistory();

  const { text } = topic;

  const handleNewAddressSubmit = () => {
    history.push(geturl(routes.oloLocationResult, topic));
  };

  return (
    <Layout>
      <Helmet>
        <title>Invullen adres - {text.heading}</title>
      </Helmet>
      <Suspense fallback={<Loading />}>
        <LocationInput
          {...{
            handleNewAddressSubmit,
            matomoTrackEvent,
            topic,
          }}
        />
      </Suspense>
    </Layout>
  );
};

export default withTracking(withChecker(OloLocationInput));
