import { themeSpacing } from "@amsterdam/asc-ui";
import { ClientOutcomes } from "@vergunningcheck/imtr-client";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { useChecker, useSlug } from "../../hooks";
import { SectionComponent } from "../../types";
import getOutcomeContent from "../../utils/getOutcomeContent";
import Disclaimer from "../Disclaimer";
import { StepByStepItem } from "../StepByStepNavigation";
import { OutcomeContent } from "./";

const OutcomeWrapper = styled.div`
  @media screen {
    padding-bottom: ${themeSpacing(5)};
  }
`;

const OutcomeSection: FunctionComponent<SectionComponent> = (props) => {
  const { checker } = useChecker();
  const slug = useSlug();
  const { t } = useTranslation();

  if (!checker) return null;

  const {
    currentSection,
    sectionFunctions: { activateSection },
  } = props;

  const { isActive, isCompleted } = currentSection;

  const outcomeType = checker.getClientOutcomeType();
  const showDiscaimer = outcomeType !== ClientOutcomes.NEED_CONTACT;

  // Define the content for the Outcome components
  const outcomeContent = getOutcomeContent(checker, slug);

  // Show content only when this section is active or completed
  const showOutcome = isActive || isCompleted;
  const handleOnClick =
    isCompleted && !isActive ? () => activateSection(currentSection) : false;

  showOutcome && console.log("nu wordt de uitkomst gerendered");

  return (
    <StepByStepItem
      active={isActive}
      as="div"
      checked={isCompleted}
      customSize
      heading={t("outcome.heading")}
      highlightActive
      largeCircle
      onClick={handleOnClick}
      // @TODO: fix the last active style
      // style={isLastSection(section) ? activeStyle : {}}
    >
      {showOutcome ? (
        <OutcomeWrapper>
          <OutcomeContent
            {...{
              outcomeContent,
              outcomeType,
              showDiscaimer,
            }}
          />

          {showDiscaimer && <Disclaimer />}
        </OutcomeWrapper>
      ) : null}
    </StepByStepItem>
  );
};

export default OutcomeSection;
