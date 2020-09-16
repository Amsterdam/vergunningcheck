import { Button, Heading, Paragraph } from "@datapunt/asc-ui";
import React from "react";
import { isIE, isMobile } from "react-device-detect";

import { ComponentWrapper, HideForPrint, PrintButton } from "../../atoms";
import Link from "../Link";

type Props = {
  contactConclusion: object;
  handlePermitButton: () => void;
  handlePrintButton: () => void;
};

export const NeedPermit: React.FC<
  Props & React.HTMLAttributes<HTMLElement>
> = ({ contactConclusion, handlePermitButton, handlePrintButton }) => (
  <>
    <Heading forwardedAs="h2">U hebt een omgevingsvergunning nodig.</Heading>
    <Paragraph>
      U kunt deze vergunning aanvragen bij het landelijk omgevingsloket
    </Paragraph>

    <HideForPrint>
      <ComponentWrapper marginBottom={10}>
        <Button type="button" color="secondary" onClick={handlePermitButton}>
          Vergunning aanvragen
        </Button>
      </ComponentWrapper>
      {!isIE && !isMobile && (
        <PrintButton
          marginTop={contactConclusion && 5}
          onClick={handlePrintButton}
          variant="textButton"
        >
          Conclusie opslaan
        </PrintButton>
      )}
    </HideForPrint>

    <Heading forwardedAs="h2">Meer weten?</Heading>
    <Paragraph>
      Wilt u weten hoe de aanvraag werkt, wat de kosten zijn of waar u nog meer
      aan moet denken als u gaat starten? Op onze pagina
      <Link>omgevingsvergunning</Link> is alle informatie te vinden.
    </Paragraph>
  </>
);
