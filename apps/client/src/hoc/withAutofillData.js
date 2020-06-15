import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

import withChecker from "./withChecker";
import Context from "../context";
import { routes, geturl, autofillRoutes } from "../routes";
import { isEmptyObject } from "../utils";
import { autofillResolvers, autofillMap } from "../autofill";

const withAutofillData = (Component) =>
  withChecker((props) => {
    const history = useHistory();
    const { autofillData } = useContext(Context);
    const { topic, checker } = props;

    // Only autofill data if this topic is an STTR-flow
    if (topic.sttrFile) {
      // if autofillData from context is available call autofill on Checker with the resolver
      // map and the autofillData we have
      if (!isEmptyObject(autofillData)) {
        checker.autofill(autofillResolvers, autofillData);
      }

      const dataNeed = checker.getAutofillDataNeeds(autofillMap, true).shift();

      if (dataNeed) {
        console.warn(
          `Data not provided (${dataNeed}), send browser back to data-need provider.`
        );
        // The following line gives a client-side console error but it works.
        history.replace(geturl(autofillRoutes[dataNeed], topic));
        return null;
      } else {
        if (checker.stack.length === 0) {
          checker.next();
        }
      }
    } else {
      // olo flow
      if (!autofillData.address) {
        console.warn("No address found, redirecting to location page");
        return <Redirect to={geturl(routes.location, { slug: topic.slug })} />;
      }
    }

    return <Component autofillData={autofillData} {...props} />;
  });

export default withAutofillData;
