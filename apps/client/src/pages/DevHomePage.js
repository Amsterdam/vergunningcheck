import React from "react";
import { Link } from "react-router-dom";

import { topics } from "../config";
import { routes, geturl } from "../routes";

import Layout from "../components/Layouts/DefaultLayout";

const DevHomePage = () => (
  <Layout heading="Hi Dev!">
    <p>Welcome to CHAPPIE 1.0</p>
    <table>
      <thead>
        <tr>
          <th>Flow</th>
          <th>slug</th>
        </tr>
      </thead>
      <tbody>
        {topics
          .sort((a) => !!a.sttrFile && -1) // make sure sttr flow is on top
          .map(({ slug, sttrFile, redirectToOlo }) => (
            <tr key={slug}>
              <td>
                {redirectToOlo ? "Redirect" : sttrFile ? "Checker" : "OLO"}
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

export default DevHomePage;
