import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

import withChecker from "./withChecker";
import Context from "../context";
import { routes, geturl, autofillRoutes } from "../routes";
import { getRestrictionByTypeName, isEmptyObject } from "../utils";

const autofillResolvers = {
  monument: ({ address }) =>
    address?.restrictions
      ? !!getRestrictionByTypeName(address.restrictions, "Monument")
      : undefined,
  cityScape: ({ address }) =>
    address?.restrictions
      ? !!getRestrictionByTypeName(address.restrictions, "CityScape")
      : undefined,
};

const withData = (Component) =>
  withChecker((props) => {
    const history = useHistory();
    const { data } = useContext(Context);
    const { topic, checker } = props;

    // Only autofill data if this topic is an STTR-flow
    if (topic.sttrFile) {
      // if data from context is available call autofill on Checker with the resolver
      // map and the data we have
      if (!isEmptyObject(data)) {
        checker.autofill(autofillResolvers, data);
      }

      const dataNeed = checker.getDataNeeds(true).shift();

      if (dataNeed) {
        console.warn(
          `Data not provided (${dataNeed}), send browser back to data-need provider.`
        );
        // The following line gives a client-side console error but it works.
        history.replace(geturl(autofillRoutes[dataNeed], topic));
        return null;
      }
    } else {
      // olo flow
      if (!data.address) {
        console.warn("No address found, redirecting to location page");
        return <Redirect to={geturl(routes.location, { slug: topic.slug })} />;
      }
    }

    return <Component data={data} {...props} />;
  });

export default withData;
