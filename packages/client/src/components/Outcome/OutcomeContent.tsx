import { Heading, themeSpacing } from "@amsterdam/asc-ui";
import { ClientOutcomes } from "@vergunningcheck/imtr-client";
import React, { FunctionComponent } from "react";
import { isIE, isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";

import { Button, ComponentWrapper, HideForPrint } from "../../atoms";
import { oloHome } from "../../config";
import { actions, eventNames } from "../../config/matomo";
import { useTopic, useTracking } from "../../hooks";
import { OutcomeContentType } from "../../types";
import { PRINT_BUTTON } from "../../utils/test-ids";
import Link from "../Link";
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
  outcomeContent: OutcomeContentType;
  outcomeType: ClientOutcomes;
  showDiscaimer?: boolean;
};

const OutcomeContent: FunctionComponent<OutcomeContentProps> = ({
  outcomeContent,
  outcomeType,
  showDiscaimer,
}) => {
  const { isPermitCheck, isPermitForm } = useTopic();
  const { matomoTrackEvent } = useTracking();
  const { t } = useTranslation();

  const { footerContent, mainContent, title } = outcomeContent;

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
      <ComponentWrapper marginBottom={24}>
        <Heading forwardedAs="h2">{title}</Heading>
      </ComponentWrapper>

      {mainContent}

      <HideForPrint>
        {!isIE && !isMobile && (
          <Button
            data-testid={PRINT_BUTTON}
            marginBottom={
              isPermitCheck && outcomeType === ClientOutcomes.PERMIT_FREE
                ? 8
                : 10
            }
            onClick={handlePrintButton}
            variant={isPermitCheck ? "textButton" : "primary"}
          >
            {t(isPermitForm ? "common.download form" : "common.save outcome")}
          </Button>
        )}
      </HideForPrint>

      <ComponentWrapper marginBottom={footerContent ? 52 : 0}>
        {footerContent}
      </ComponentWrapper>

      {isPermitCheck && (
        <HideForPrint>
          <NewCheckerModal />
          {!isMobile && <ComponentWrapper>&nbsp;</ComponentWrapper>}
        </HideForPrint>
      )}

      {isPermitForm && (
        <Link
          eventName={t("common.to the olo")}
          href={oloHome}
          target="_blank"
          variant="inline"
        >
          {t("common.to the olo")}
        </Link>
      )}
    </OutcomeContentWrapper>
  );
};

export default OutcomeContent;
