import { Button, Link, Paragraph } from "@amsterdam/asc-ui";
import React from "react";

import { HideForPrint, PrintOnly } from "../../atoms";
import ComponentWrapper from "../../atoms/ComponentWrapper";
import { urls } from "../../config";
import { actions, eventNames } from "../../config/matomo";
import { NEED_PERMIT_BUTTON } from "../../utils/test-ids";

const NeedPermitContent: React.FC<{ matomoTrackEvent: Function }> = ({
  matomoTrackEvent,
}) => {
  const handlePermitInfoButton = () => {
    matomoTrackEvent({
      action: actions.CLICK_EXTERNAL_NAVIGATION,
      name: eventNames.PERMIT_INFORMATION,
    });
    // Open OLO in new tab/window
    window.open(urls.HOW_TO_GET_A_PERMIT_OPEN, "_blank");
  };

  return (
    <>
      <Paragraph gutterBottom={16}>
        U kunt deze vergunning aanvragen{" "}
        <HideForPrint as="span">bij het landelijk Omgevingsloket.</HideForPrint>
        <PrintOnly as="span">
          op{" "}
          <Link variant="inline" href={urls.OLO_HOME}>
            www.omgevingsloket.nl
          </Link>
        </PrintOnly>
      </Paragraph>
      <HideForPrint>
        <ComponentWrapper marginBottom={32}>
          <Button
            data-testid={NEED_PERMIT_BUTTON}
            onClick={handlePermitInfoButton}
            type="button"
            variant="primaryInverted"
          >
            Meer over vergunning aanvragen
          </Button>
        </ComponentWrapper>
      </HideForPrint>
    </>
  );
};

export default NeedPermitContent;
