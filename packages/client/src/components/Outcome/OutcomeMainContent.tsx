import { Link, Paragraph } from "@amsterdam/asc-ui";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { Button, HideForPrint, PrintOnly } from "../../atoms";
import ComponentWrapper from "../../atoms/ComponentWrapper";
import { urls } from "../../config";
import { actions, eventNames } from "../../config/matomo";
import { useTracking } from "../../hooks";
import { NEED_PERMIT_BUTTON } from "../../utils/test-ids";

type NeedPermitProps = {
  contentText?: string;
  eventName?: string;
  linkText?: string;
  url?: string;
};

const OutcomeMainContent: FunctionComponent<NeedPermitProps> = ({
  contentText,
  eventName = eventNames.HOW_TO_APPLY_FOR_A_PERMIT,
  linkText,
  url = urls.GENERAL_PERMIT_PAGE,
}) => {
  const { matomoTrackEvent } = useTracking();
  const { t } = useTranslation();

  const content =
    contentText ??
    t("outcome.needPermit.on this page you can read more how to apply");

  const link = linkText ?? t("outcome.needPermit.how to apply");

  // Make sure to render the component with content
  if (!content || !link) return null;

  const handlePermitInfoButton = () => {
    matomoTrackEvent({
      action: actions.CLICK_EXTERNAL_NAVIGATION,
      name: eventName,
    });
    window.open(url, "_blank");
  };

  return (
    <ComponentWrapper marginBottom={40}>
      <Paragraph>{content}</Paragraph>
      <HideForPrint>
        <Button
          data-testid={NEED_PERMIT_BUTTON}
          onClick={handlePermitInfoButton}
          type="button"
          variant="primaryInverted"
        >
          {link}
        </Button>
      </HideForPrint>
      <PrintOnly>
        <Link href={url} onClick={handlePermitInfoButton} variant="inline">
          {link}
        </Link>
      </PrintOnly>
    </ComponentWrapper>
  );
};

export default OutcomeMainContent;
