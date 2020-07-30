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
  useEffect(() => {
    fetch(`${window.location.origin}/sttr/topics.json`)
      .then((res) => res.json())
      .then(setConfig);
  }, []);

  return (
    <Layout heading="Hi Dev!">
      <p>Welcome to CHAPPIE 1.0</p>

      <table>
        <thead>
          <th>Checkers</th>
          <th>slug</th>
        </thead>
        <tbody>
          {config.map((apiConfig) =>
            Object.entries(apiConfig).map(([slug, permitIds]) => (
              <tr>
                <td>
                  <Link to={geturl(routes.intro, { slug })}>{slug}</Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

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
    </Layout>
  );
};

export default DevHomePage;
