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
    window.open(urls.GENERAL_PERMIT_PAGE, "_blank");
  };

  return (
    <ComponentWrapper marginBottom={40}>
      <Paragraph>
        Op de pagina 'Zo werkt aanvragen' leest u hoe u de aanvraag indient, hoe
        lang het duurt en wat het kost
      </Paragraph>
      <PrintOnly>
        <Link
          data-testid={NEED_PERMIT_BUTTON}
          href={urls.GENERAL_PERMIT_PAGE}
          onClick={handlePermitInfoButton}
          variant="inline"
        >
          Zo werkt aanvragen
        </Link>
      </PrintOnly>
      <HideForPrint>
        <ComponentWrapper marginBottom={32}>
          <Button
            onClick={handlePermitInfoButton}
            type="button"
            variant="primaryInverted"
          >
            Zo werkt aanvragen
          </Button>
        </ComponentWrapper>
      </HideForPrint>
    </ComponentWrapper>
  );
};

export default NeedPermitContent;
