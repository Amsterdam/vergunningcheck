import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../components/Layouts/DefaultLayout";
import { Flow, isProduction, topics } from "../config";
import { geturl, routes } from "../routes";

const DevHomePage = () => {
  const [config, setConfig] = useState([]);

  if (isProduction) {
    localStorage.setItem("doNotTrack", "true");
  }
  console.log({ config });
  useEffect(() => {
    fetch(`${window.location.origin}/topics.json`)
      .then((res) => res.json())
      .then(setConfig);
  }, []);

  return (
    <Layout heading="Hi Dev!">
      <p>Welcome to CHAPPIE 2.0</p>
      <table>
        <thead>
          <tr>
            <th>Flow</th>
            <th>slug</th>
          </tr>
        </thead>
        <tbody>
          {topics
            // .sort((a) => !!a.sttrFile && -1) // make sure sttr flow is on top
            .map(({ slug, flow }) => (
              <tr key={slug}>
                <td>
                  {flow === Flow.oloRedirect && "Redirect"}
                  {flow === Flow.olo && "OLO"}
                  {flow === Flow.sttr && "Checker"}
                </td>
                <td>
                  <Link to={geturl(routes.intro, { slug })}>{slug}</Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {config.map((apiConfig) => (
        <>
          <table>
            <thead>
              <th>Checkers</th>
              <th>slug</th>
            </thead>
            <tbody>
              {apiConfig.map(({ slug, path }) => (
                <tr>
                  <td>
                    <Link
                      to={geturl(routes.intro, { prefix: "staging", slug })}
                    >
                      {path}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ))}
    </Layout>
  );
};

export default DevHomePage;
