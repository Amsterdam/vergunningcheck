import { Button, Heading, Paragraph } from "@datapunt/asc-ui";
import React from "react";

import ComponentWrapper from "../../atoms/ComponentWrapper";
import { Olo } from "../../config";
import { actions, eventNames } from "../../config/matomo";
import { NEED_PERMIT, NEED_PERMIT_BUTTON } from "../../utils/test-ids";
import Link from "../Link";

export const NeedPermitFooter = () => (
  <>
    <Heading forwardedAs="h2" data-testid={NEED_PERMIT}>
      Meer weten?
    </Heading>
    <Paragraph gutterBottom={36}>
      Wilt u weten hoe de aanvraag werkt, wat de kosten zijn of waar u nog meer
      aan moet denken als u gaat starten? Op onze pagina{" "}
      <Link
        variant={"inline"}
        href={
          "https://www.amsterdam.nl/veelgevraagd/?productid=%7B215DE049-EFA3-492D-A4B1-EDFF40E0BC51%7D"
        }
      >
        omgevingsvergunning
      </Link>{" "}
      is alle informatie te vinden.
    </Paragraph>
  </>
);

export const NeedPermitContent: React.FC<{ matomoTrackEvent: Function }> = ({
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
      <Paragraph gutterBottom={16}>
        U kunt deze vergunning aanvragen bij het landelijk omgevingsloket
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
    </>
  );
};
