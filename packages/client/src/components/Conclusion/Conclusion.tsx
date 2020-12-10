import { themeSpacing } from "@amsterdam/asc-ui";
import { imtrOutcomes } from "@vergunningcheck/imtr-client";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { sections } from "../../config/matomo";
import { useChecker } from "../../hooks";
import Disclaimer from "../Disclaimer";
import Loading from "../Loading";
import Markdown from "../Markdown";
import { ConclusionOutcome, NeedPermitContent, NoPermitDescription } from ".";

const ConclusionWrapper = styled.div`
  @media screen {
    padding-bottom: ${themeSpacing(5)};
  }
`;
const { NEED_CONTACT, NEED_PERMIT, PERMIT_FREE } = imtrOutcomes;

const Conclusion: FunctionComponent = () => {
  const { checker } = useChecker();
  const { t } = useTranslation();

  if (checker === undefined) {
    return <Loading />;
  }
  // Get all the outcomes to display
  const outcomes = checker.getOutcomesToDisplay();
  const outcomeType = checker.outcomeType();

  // The "need contact" content comes from the IMTR file itself
  const getNeedContactContent = outcomes.find(
    ({ outcome }: { outcome: string }) => outcome === imtrOutcomes.NEED_CONTACT
  );

  // Define the content for the Conclusion components
  const contents = {
    [NEED_CONTACT]: {
      mainContent: (
        <Markdown
          eventLocation={sections.CONCLUSION}
          source={getNeedContactContent?.description || ""}
        />
      ),
      title: getNeedContactContent?.title || "",
    },
    [NEED_PERMIT]: {
      mainContent: <NeedPermitContent />,
      title: t("outcome.needPermit.you need a permit"),
    },
    [PERMIT_FREE]: {
      footerContent: <NoPermitDescription />,
      title: t("outcome.permitFree.you dont need a permit"),
    },
    // @TODO: extend with NEED_REPORT
    // See: https://github.com/Amsterdam/vergunningcheck/pull/668
  };

  const conclusionContent = contents[outcomeType];
  const showDiscaimer = outcomeType !== NEED_CONTACT;

  if (!conclusionContent) {
    return null;
  }

  return (
    <ConclusionWrapper>
      <ConclusionOutcome
        {...{
          conclusionContent,
          outcomeType,
          showDiscaimer,
        }}
      />

      {showDiscaimer && <Disclaimer />}
    </ConclusionWrapper>
  );
};

export default Conclusion;
