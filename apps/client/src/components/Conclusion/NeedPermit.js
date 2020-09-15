import { Button, Heading, Paragraph } from "@datapunt/asc-ui";
import React from "react";
import { isIE, isMobile } from "react-device-detect";

import { ComponentWrapper, HideForPrint, PrintButton } from "../../atoms";
import Link from "../Link";

const needsPermit = ({
  handlePermitButton,
  handlePrintButton,
  contactConclusion,
}) => {
  return (
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
            variant="textButton"
            onClick={handlePrintButton}
            marginTop={contactConclusion && 5}
          >
            Conclusie opslaan
          </PrintButton>
        )}
      </HideForPrint>

      <Heading forwardedAs="h2">Meer weten?</Heading>
      <Paragraph>
        Wilt u weten hoe de aanvraag werkt, wat de kosten zijn of waar u nog
        meer aan moet denken als u gaat starten? Op onze pagina
        <Link>omgevingsvergunning</Link> is alle informatie te vinden.
      </Paragraph>
    </>
  );
};

export default needsPermit;
