import React from "react";
import { Link } from "react-router-dom";

import { Alert } from "../atoms";
import Layout from "../components/Layouts/DefaultLayout";
import { isProduction, topics } from "../config";
import { geturl, routes } from "../routes";
import topicsJson from "../topics.json";

const DevHomePage = () => {
  if (isProduction) {
    localStorage.setItem("doNotTrack", "true");
  }

  return (
    <Layout heading="Welcome to CHAPPIE 2.0">
      <p>
        <Alert level="attention">
          Let op; deze pagina bevat links naar vergunningchecks die mogelijk
          (nog) niet correct werken.{" "}
          <strong>
            Als u niet bij de gemeente Amsterdam werkt dient u deze pagina niet
            te gebruiken.
          </strong>
        </Alert>
      </p>
      <table>
        <tr>
          <td>
            <strong>Name</strong>
          </td>
          <td>
            <strong>Flow</strong>
          </td>
          <td>
            <strong>Folder</strong>
          </td>
          <td>
            <strong>#&nbsp;permits</strong>
          </td>
        </tr>
        <tbody>
          {topics
            .filter(({ hasSTTR }) => !hasSTTR) // only show olo / redir-olo topics
            .map(({ slug, name, redirectToOlo }) => (
              <tr key={slug}>
                <td>
                  <Link to={geturl(routes.intro, { slug })}>{name}</Link>
                </td>
                <td>{redirectToOlo ? "Redirect" : "OLO"}</td>
                <td>n.a.</td>
                <td>0</td>
              </tr>
            ))}
          {topicsJson.map((apiConfig) => {
            return apiConfig.map((apiTopic) => {
              const sttrTopic = topics.find(
                (topic) => topic.slug === apiTopic.slug
              );

              const title = sttrTopic
                ? sttrTopic.name
                : apiTopic
                ? apiTopic.name || apiTopic.slug
                : "[ERROR]";
              return (
                <tr>
                  <td>
                    {sttrTopic && !sttrTopic.hasSTTR ? (
                      <>
                        {title}
                        <br />
                        <Alert level="attention">
                          STTR file found for <strong>{sttrTopic.name}</strong>,
                          but we can't load '<strong>{sttrTopic.slug}</strong>'
                          because it's configured to be{" "}
                          <strong>
                            {sttrTopic.redirectToOlo ? "redirectToOlo" : "olo"}
                            -flow
                          </strong>
                          .
                        </Alert>
                      </>
                    ) : (
                      <Link to={geturl(routes.intro, apiTopic)}>{title}</Link>
                    )}
                  </td>
                  <td>{sttrTopic ? "configured" : "dynamic"}</td>
                  <td>{apiTopic.path.split("/")[0]}</td>
                  <td>
                    <span
                      title={apiTopic.permits}
                      onClick={() => alert(apiTopic.permits)}
                    >
                      {apiTopic.permits.length}
                    </span>
                  </td>
                </tr>
              );
            });
          })}
        </tbody>
      </table>
    </Layout>
  );
};

export default DevHomePage;
