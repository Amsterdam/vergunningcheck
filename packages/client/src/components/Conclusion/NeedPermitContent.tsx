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
      name: eventNames.HOW_TO_APPLY_FOR_A_PERMIT,
    });
    window.open(urls.HOW_TO_APPLY_FOR_A_PERMIT, "_blank");
  };

  return (
    <>
      <Paragraph>
        U leest meer over hoe u een vergunning aanvraagt, wat de kosten zijn en
        hoe lang het duurt op onze pagina over het aanvragen van een
        omgevingsvergunning.
      </Paragraph>
      <PrintOnly as="span">
        Zo werkt aanvragen:{" "}
        <Link variant="inline" href={urls.HOW_TO_APPLY_FOR_A_PERMIT}>
          {urls.HOW_TO_APPLY_FOR_A_PERMIT}
        </Link>
      </PrintOnly>
      <HideForPrint>
        <ComponentWrapper marginBottom={32}>
          <Button
            data-testid={NEED_PERMIT_BUTTON}
            onClick={handlePermitInfoButton}
            type="button"
            variant="primaryInverted"
          >
            Zo werkt aanvragen
          </Button>
        </ComponentWrapper>
      </HideForPrint>
    </>
  );
};

export default NeedPermitContent;
