import { Button, Link, Paragraph } from "@datapunt/asc-ui";
import React from "react";

import { HideForPrint, PrintOnly } from "../../atoms";
import ComponentWrapper from "../../atoms/ComponentWrapper";
import { urls } from "../../config";
import { actions, eventNames } from "../../config/matomo";
import { NEED_PERMIT_BUTTON } from "../../utils/test-ids";

const NeedPermitContent: React.FC<{ matomoTrackEvent: Function }> = ({
  matomoTrackEvent,
}) => {
  const handlePermitButton = () => {
    matomoTrackEvent({
      action: actions.CLICK_EXTERNAL_NAVIGATION,
      name: eventNames.APPLY_FOR_PERMIT,
    });
    // Open OLO in new tab/window
    window.open(urls.OLO_HOME, "_blank");
  };

  return (
    <>
      <Paragraph gutterBottom={16}>
        U kunt deze vergunning aanvragen{" "}
        <HideForPrint as="span">bij het landelijk Omgevingsloket.</HideForPrint>
        <PrintOnly as="span">
          op{" "}
          <Link variant="inline" href={urls.OMGEVINGSLOKET}>
            www.omgevingsloket.nl
          </Link>
        </PrintOnly>
      </Paragraph>
      <HideForPrint>
        <ComponentWrapper marginBottom={32}>
          <Button
            color="secondary"
            data-testid={NEED_PERMIT_BUTTON}
            onClick={handlePermitButton}
            type="button"
          >
            Vergunning aanvragen
          </Button>
        </ComponentWrapper>
      </HideForPrint>
    </>
  );
};

export default NeedPermitContent;
