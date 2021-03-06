import { themeSpacing } from "@amsterdam/asc-ui";
import { ClientOutcomes } from "@vergunningcheck/imtr-client";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { Disclaimer } from "../../atoms";
import { useChecker, useSlug, useTopic } from "../../hooks";
import { SectionComponent } from "../../types";
import getOutcomeContent from "../../utils/getOutcomeContent";
import { OUTCOME_SECTION, OUTCOME_SECTION_CONTENT } from "../../utils/test-ids";
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
  const { isPermitCheck } = useTopic();
  const { t } = useTranslation();

  if (!checker) return null;

  const {
    currentSection,
    sectionFunctions: { changeActiveSection },
  } = props;

  const { isActive, isCompleted } = currentSection;

  const outcomeType = checker.getClientOutcomeType();
  const showDiscaimer =
    outcomeType !== ClientOutcomes.NEED_CONTACT && isPermitCheck;

  // Define the content for the Outcome components
  const outcomeContent = getOutcomeContent(checker, slug);

  // Show content only when this section is active or completed
  const showContent = isActive || isCompleted;
  const handleOnClick =
    isCompleted && !isActive
      ? () => changeActiveSection(currentSection)
      : false;

  const Outcome = () => (
    <OutcomeWrapper data-testid={OUTCOME_SECTION_CONTENT}>
      <OutcomeContent
        {...{
          outcomeContent,
          outcomeType,
          showDiscaimer,
        }}
      />
      {showDiscaimer && <Disclaimer />}
    </OutcomeWrapper>
  );

  return (
    <StepByStepItem
      active={isActive}
      activeStyle={isActive}
      as="div"
      checked={isCompleted}
      customSize
      data-testid={OUTCOME_SECTION}
      heading={t("outcome.heading")}
      highlightActive
      largeCircle
      onClick={handleOnClick}
    >
      {showContent && <Outcome />}
    </StepByStepItem>
  );
};

export default OutcomeSection;
