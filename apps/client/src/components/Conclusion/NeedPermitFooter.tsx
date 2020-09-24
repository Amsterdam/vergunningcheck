import { Heading, Paragraph } from "@datapunt/asc-ui";
import React from "react";

import { NEED_PERMIT } from "../../utils/test-ids";
import Link from "../Link";

const NeedPermitFooter: React.FC = () => (
  <>
    <Heading forwardedAs="h2" data-testid={NEED_PERMIT}>
      Meer weten?
    </Heading>
    <Paragraph gutterBottom={36}>
      Wilt u weten hoe de aanvraag werkt? Of wat de kosten zijn en waar u nog
      meer aan moet denken als u gaat starten? Op onze pagina{" "}
      <Link
        eventName="omgevingsvergunning informatie"
        href={
          "https://www.amsterdam.nl/veelgevraagd/?productid=%7B215DE049-EFA3-492D-A4B1-EDFF40E0BC51%7D"
        }
        variant="inline"
      >
        omgevingsvergunning
      </Link>{" "}
      vindt u alle informatie.
    </Paragraph>
  </>
);

export default NeedPermitFooter;
