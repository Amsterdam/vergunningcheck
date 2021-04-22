import { themeSpacing } from "@amsterdam/asc-ui";
import { ClientOutcomes } from "@vergunningcheck/imtr-client";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { useChecker } from "../../hooks";
import { SectionComponent } from "../../types";
import { OUTCOME_SECTION, OUTCOME_SECTION_CONTENT } from "../../utils/test-ids";
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
  const { t } = useTranslation();

  if (!checker) return null;

  const {
    currentSection,
    sectionFunctions: { changeActiveSection },
  } = props;

  const { isActive, isCompleted } = currentSection;

  const outcomeType = checker.getClientOutcomeType();
  const showDiscaimer = outcomeType !== ClientOutcomes.NEED_CONTACT;

  // Define the content for the Outcome components
  const outcomeContent = "some outcome ...";

  // Show content only when this section is active or completed
  const showOutcome = isActive || isCompleted;
  const handleOnClick =
    isCompleted && !isActive
      ? () => changeActiveSection(currentSection)
      : false;

  // @TODO: fix the active style in a proper way without `style`
  const activeStyle = { marginTop: -1, borderColor: "white" };

  return (
    <StepByStepItem
      active={isActive}
      as="div"
      checked={isCompleted}
      customSize
      data-testid={OUTCOME_SECTION}
      heading={t("outcome.heading")}
      highlightActive
      largeCircle
      onClick={handleOnClick}
      style={isActive ? activeStyle : {}}
    >
      {showOutcome ? (
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
      ) : null}
    </StepByStepItem>
  );
};

export default OutcomeSection;
