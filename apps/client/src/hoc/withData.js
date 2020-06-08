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

    // Only autofill data if it's enabled
    if (topic.sttrFile) {
      if (!checker.autofilled && !isEmptyObject(data)) {
        const questions = checker._getQuestions();

        // For every questions see if we have data (from context)
        // and see if the question can be autofilled
        questions.forEach((question) => {
          const resolver = autofillResolvers[question.autofill];
          const answer = resolver ? resolver(data) : undefined;
          if (answer !== undefined) {
            question.setAnswer(answer);
          }
        });
        checker.autofilled = true;
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
      // old logic
      if (!data.address) {
        console.warn("No address found, redirecting to location page");
        return <Redirect to={geturl(routes.location, { slug: topic.slug })} />;
      }
    }

    return <Component data={data} {...props} />;
  });

export default withData;
