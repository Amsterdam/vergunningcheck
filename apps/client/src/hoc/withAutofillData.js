import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

import { autofillMap, autofillResolvers } from "../config/autofill";
import { SessionContext } from "../context";
import { autofillRoutes, geturl, routes } from "../routes";
import withChecker from "./withChecker";

const withAutofillData = (Component) =>
  withChecker((props) => {
    const history = useHistory();
    const sessionContext = useContext(SessionContext);
    const { topic, checker } = props;
    const address = sessionContext.address?.[topic.slug];

    // Only autofill data if this topic is an STTR-flow
    if (topic.sttrFile) {
      // if autofillData from context is available call autofill on Checker with the resolver
      // map and the autofillData we have
      if (address) {
        checker.autofill(autofillResolvers, { address });
      }

      // Find if we have missing data needs
      const unfulfilledDataNeed = checker
        .getAutofillDataNeeds(autofillMap, true)
        .shift();

      // If we have unfulfilled data needs, send the user to the page where it can be resolved
      if (unfulfilledDataNeed) {
        console.warn(
          `Data not provided (${unfulfilledDataNeed}), send browser back to data-need provider.`
        );
        // The following line gives a client-side console error but it works.
        const route = autofillRoutes[unfulfilledDataNeed].shift();
        history.replace(geturl(route, topic));
        return null;
      } else {
        if (checker.stack.length === 0) {
          checker.next();
        }
      }
    } else {
      // olo flow
      if (!address) {
        console.warn("No address found, redirecting to location page");
        return <Redirect to={geturl(routes.location, topic)} />;
      }
    }

    return <Component autofillData={{ address }} {...props} />;
  });

export default withAutofillData;
