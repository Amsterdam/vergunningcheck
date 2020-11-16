import { Button, Link, Paragraph } from "@amsterdam/asc-ui";
import React from "react";
import { useTranslation } from "react-i18next";

import { HideForPrint, PrintOnly } from "../../../atoms";
import ComponentWrapper from "../../../atoms/ComponentWrapper";
import { urls } from "../../../config";
import { actions, eventNames } from "../../../config/matomo";
import withTracking, { MatomoTrackEventProps } from "../../../hoc/withTracking";
import { NEED_PERMIT_BUTTON } from "../../../utils/test-ids";

const DemolitionNeedPermit: React.FC<MatomoTrackEventProps> = ({
  matomoTrackEvent,
}) => {
  const { t } = useTranslation();
  const handlePermitInfoButton = () => {
    matomoTrackEvent({
      action: actions.CLICK_EXTERNAL_NAVIGATION,
      name: eventNames.HOW_TO_APPLY_FOR_A_PERMIT,
    });
    window.open(urls.GENERAL_PERMIT_PAGE, "_blank");
  };

  return (
    <ComponentWrapper marginBottom={40}>
      <Paragraph>
        {t("outcome.needPermit.on the page this is how apply works")}
      </Paragraph>
      <PrintOnly>
        <Link
          data-testid={NEED_PERMIT_BUTTON}
          href={urls.GENERAL_PERMIT_PAGE}
          onClick={handlePermitInfoButton}
          variant="inline"
        >
          {t("outcome.needPermit.how to apply")}
        </Link>
      </PrintOnly>
      <HideForPrint>
        <ComponentWrapper marginBottom={32}>
          <Button
            onClick={handlePermitInfoButton}
            type="button"
            variant="primaryInverted"
          >
            {t("outcome.needPermit.how to apply")}
          </Button>
        </ComponentWrapper>
      </HideForPrint>
    </ComponentWrapper>
  );
};

export default withTracking(DemolitionNeedPermit);
