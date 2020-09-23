import { Button, Link, Paragraph } from "@datapunt/asc-ui";
import React from "react";

import { HideForPrint, PrintOnly } from "../../atoms";
import ComponentWrapper from "../../atoms/ComponentWrapper";
import { Olo } from "../../config";
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
    window.open(Olo.home, "_blank");
  };

  return (
    <>
      <HideForPrint>
        <Paragraph gutterBottom={16}>
          U kunt deze vergunning aanvragen bij het landelijk Omgevingsloket.
        </Paragraph>
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
      <PrintOnly>
        <Paragraph gutterBottom={16}>
          U kunt deze vergunning aanvragen op{" "}
          <Link variant="inline">https://www.omgevingsloket.nl/</Link>
        </Paragraph>
      </PrintOnly>
    </>
  );
};

export default NeedPermitContent;
