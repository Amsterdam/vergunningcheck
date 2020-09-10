import React from "react";
import { Helmet } from "react-helmet";

import Checker from "../components/Checker";
import DebugDecisionTable from "../components/DebugDecisionTable";
import Layout from "../components/Layouts/DefaultLayout";
import PrintDetails from "../components/PrintDetails";
import { useChecker, useTopic } from "../hooks";
import LoadingPage from "./LoadingPage";
import NotFoundPage from "./NotFoundPage";

type Props = {
  resetChecker: Function;
};

const CheckerPage = ({ resetChecker }: Props) => {
  const checker = useChecker();
  const topic = useTopic();

  if (!topic) {
    return <NotFoundPage />;
  }
  if (topic.sttrFile && !checker) {
    return <LoadingPage />;
  }

  /**
   * @TODO: Write test file to test:
   * - !topic > <NotFoundPage />;
   * - topic.sttrFile && !checker > <LoadingPage />;
   * - else > <Checker />
   */

  return (
    <Layout>
      <Helmet>
        <title>Vragen en conclusie - {topic.text.heading}</title>
      </Helmet>

      <PrintDetails />

      <Checker {...{ checker, resetChecker, topic }} />

      <DebugDecisionTable {...{ topic, checker }} />
    </Layout>
  );
};
export default CheckerPage;
