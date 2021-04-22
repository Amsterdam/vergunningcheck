// @TODO: TRANSLATE
import { themeSpacing } from "@amsterdam/asc-ui";
import { ClientOutcomes } from "@vergunningcheck/imtr-client";
import React, { FunctionComponent } from "react";
import { isIE, isMobile } from "react-device-detect";
import styled, { css } from "styled-components";

import { ComponentWrapper, HideForPrint, PrintButton } from "../../atoms";
import { actions, eventNames } from "../../config/matomo";
import { useTracking } from "../../hooks";
import { PRINT_BUTTON } from "../../utils/test-ids";
import NewCheckerModal from "./NewCheckerModal";

const OutcomeContentWrapper = styled.div<{ showDiscaimer?: boolean }>`
  margin-bottom: ${themeSpacing(9)};

  ${({ showDiscaimer }) =>
    showDiscaimer &&
    css`
      margin-bottom: ${themeSpacing(10)};
    `};
`;

type OutcomeContentProps = {
  outcomeContent: String;
  outcomeType: ClientOutcomes;
  showDiscaimer?: boolean;
};

const OutcomeContent: FunctionComponent<OutcomeContentProps> = ({
  outcomeContent,
  outcomeType,
  showDiscaimer,
}) => {
  const { matomoTrackEvent } = useTracking();

  const handlePrintButton = () => {
    matomoTrackEvent({
      action: actions.DOWNLOAD,
      name: eventNames.SAVE_OUTCOME,
    });
    window.print();
  };

  return (
    <OutcomeContentWrapper {...{ showDiscaimer }}>
      <ComponentWrapper marginBottom={16} />

      <ComponentWrapper marginBottom={24}>{outcomeContent}</ComponentWrapper>

      <HideForPrint>
        {!isIE && !isMobile && (
          <PrintButton
            data-testid={PRINT_BUTTON}
            marginBottom={outcomeType === ClientOutcomes.PERMIT_FREE ? 32 : 40}
            onClick={handlePrintButton}
            variant="textButton"
          >
            Uitkomst opslaan
          </PrintButton>
        )}
      </HideForPrint>

      <HideForPrint>
        <NewCheckerModal />
        {!isMobile && <ComponentWrapper>&nbsp;</ComponentWrapper>}
      </HideForPrint>
    </OutcomeContentWrapper>
  );
};

export default OutcomeContent;
