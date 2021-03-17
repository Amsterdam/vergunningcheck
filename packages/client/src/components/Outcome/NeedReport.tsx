import { Link, Paragraph } from "@amsterdam/asc-ui";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { Button, HideForPrint, PrintOnly } from "../../atoms";
import ComponentWrapper from "../../atoms/ComponentWrapper";
import { urls } from "../../config";
import { actions, eventNames } from "../../config/matomo";
import { useTracking } from "../../hooks";
import { NEED_REPORT_BUTTON } from "../../utils/test-ids";

type NeedReportProps = {
  contentText?: string;
  eventName?: string;
  linkText?: string;
  url?: string;
};

const NeedReport: FunctionComponent<NeedReportProps> = ({
  contentText = "outcome.needReport.on this page you can read more about report",
  eventName = eventNames.HOW_TO_REPORT,
  linkText = "outcome.needReport.how to report",
  url = urls.FIRESAFETY_PAGE,
}) => {
  const { t } = useTranslation();
  const { matomoTrackEvent } = useTracking();

  const handlePermitInfoButton = () => {
    matomoTrackEvent({
      action: actions.CLICK_EXTERNAL_NAVIGATION,
      name: eventName,
    });
    window.open(url, "_blank");
  };

  return (
    <ComponentWrapper marginBottom={40}>
      <Paragraph>{t(contentText)}</Paragraph>
      <HideForPrint>
        <Button
          data-testid={NEED_REPORT_BUTTON}
          onClick={handlePermitInfoButton}
          type="button"
          variant="primaryInverted"
        >
          {t(linkText)}
        </Button>
      </HideForPrint>
      <PrintOnly>
        <Link href={url} onClick={handlePermitInfoButton} variant="inline">
          {t(linkText)}
        </Link>
      </PrintOnly>
    </ComponentWrapper>
  );
};

export default NeedReport;
