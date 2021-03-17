import { Heading, Paragraph, themeSpacing } from "@amsterdam/asc-ui";
import { ClientOutcomes } from "@vergunningcheck/imtr-client";
import React, { FunctionComponent } from "react";
import { isIE, isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";

import { Button, ComponentWrapper, HideForPrint } from "../../atoms";
import { oloHome } from "../../config";
import { actions, eventNames } from "../../config/matomo";
import { useSlug, useTopic, useTopicData, useTracking } from "../../hooks";
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
  const slug = useSlug();
  const { isPermitCheck, isPermitForm } = useTopic();
  const { topicData } = useTopicData();
  const { matomoTrackEvent } = useTracking();
  const { t } = useTranslation();

  const { footerContent, mainContent, title } = outcomeContent;

  // When the PreQuestion `MultipleCheckers` has been answered with `true` we will show an alternate text above the `NewCheckerModal`
  const multipleCheckersText =
    t(
      `outcome.${slug}.you would like to build more than 1 so you need to do multiple permits`
    ) +
    " " +
    t("outcome.if you have other plans you can do other permit checks as well");

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
            {t(isPermitCheck ? "common.save outcome" : "common.download form")}
          </Button>
        )}
      </HideForPrint>

      <ComponentWrapper marginBottom={footerContent ? 52 : 0}>
        {footerContent}
      </ComponentWrapper>

      {isPermitCheck && (
        <HideForPrint>
          <Paragraph>
            {topicData.questionMultipleCheckers
              ? multipleCheckersText
              : t(
                  "outcome.if you have other plans you can do other permit checks"
                )}
          </Paragraph>
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
