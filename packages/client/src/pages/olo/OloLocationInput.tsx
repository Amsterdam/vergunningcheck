import React, { Suspense } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

import Layout from "../../components/Layouts/TopicLayout";
import Loading from "../../components/Loading";
import { LocationInput } from "../../components/Location/";
import { useTopic } from "../../hooks";
import { geturl, routes } from "../../routes";

const OloLocationInput: React.FC = () => {
  const topic = useTopic();
  const history = useHistory();

  return (
    <Layout>
      <Helmet>
        <title>Invullen adres - {topic.text.heading}</title>
      </Helmet>
      <Suspense fallback={<Loading />}>
        <LocationInput
          handleNewAddressSubmit={() => {
            history.push(geturl(routes.oloLocationResult, topic));
          }}
        />
      </Suspense>
    </Layout>
  );
};

export default OloLocationInput;
