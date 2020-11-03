import { themeSpacing } from "@datapunt/asc-ui";
import React from "react";
import styled from "styled-components";

import { PrintOnly } from "../atoms";
import { sections } from "../config/matomo";
import { useChecker } from "../hooks";
import { sttrOutcomes } from "../sttr_client/models/checker";
import Rule from "../sttr_client/models/rule";
import { removeQuotes } from "../utils";
import { NEED_CONTACT } from "../utils/test-ids";
import {
  ConclusionOutcome,
  NeedPermitContent,
  NeedPermitFooter,
  NoPermitDescription,
} from "./Conclusion/";
import Disclaimer from "./Disclaimer";
import Markdown from "./Markdown/index";

const ConclusionWrapper = styled.div`
  @media screen {
    padding-bottom: ${themeSpacing(5)};
  }
`;

const Conclusion: React.FC = () => {
  const [checker] = useChecker();

  // find conclusions we want to display to the user
  const conclusions = checker?.permits
    .filter((permit: any) => !!permit.getOutputByDecisionId("dummy"))
    .map((permit: any) => {
      const conclusion = permit.getDecisionById("dummy");
      const conclusionMatchingRules = conclusion.getMatchingRules();
      const contactOutcome = conclusionMatchingRules.find(
        (rule: Rule) => rule.outputValue === sttrOutcomes.NEED_CONTACT
      );
      const outcome =
        contactOutcome?.outputValue || conclusionMatchingRules[0].outputValue;

      return {
        outcome,
        title:
          outcome === sttrOutcomes.NEED_CONTACT
            ? "Neem contact op met de gemeente"
            : `${permit.name.replace("Conclusie", "")}: ${removeQuotes(
                outcome
              )}`,
        description:
          outcome === sttrOutcomes.NEED_CONTACT
            ? contactOutcome.description
            : conclusionMatchingRules[0].description,
      };
    });

  // Check if the conclusion is 'needContact'
  const contactConclusion = conclusions.find(
    ({ outcome }) => outcome === sttrOutcomes.NEED_CONTACT
  );

  // Check if the conclusion is 'needPermit'
  const needPermit = !!conclusions.find(
    ({ outcome }) => outcome === sttrOutcomes.NEED_PERMIT
  );

  const needContactContent = {
    mainContent: (
      <div data-testid={NEED_CONTACT}>
        <Markdown
          eventLocation={sections.CONCLUSION}
          source={contactConclusion?.description}
        />
      </div>
    ),
    title: contactConclusion?.title || "An error occured",
  };

  const needPermitContent = {
    footerContent: <NeedPermitFooter />,
    mainContent: <NeedPermitContent />,
    title: "U hebt een omgevingsvergunning nodig.",
  };

  const permitFreeContent = {
    footerContent: <NoPermitDescription />,
    title: "U hebt geen omgevingsvergunning nodig. ",
  };

  const conclusionContent = contactConclusion
    ? needContactContent
    : needPermit
    ? needPermitContent
    : permitFreeContent;

  return (
    <ConclusionWrapper>
      <ConclusionOutcome conclusionContent={conclusionContent} />

      <PrintOnly avoidPageBreak withBorder>
        <Disclaimer />
      </PrintOnly>
    </ConclusionWrapper>
  );
};

export default Conclusion;
