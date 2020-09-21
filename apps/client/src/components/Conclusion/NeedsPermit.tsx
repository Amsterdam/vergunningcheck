import { Heading, Paragraph } from "@datapunt/asc-ui";
import React from "react";

import Link from "../Link";

export const NeedsPermit = () => (
  <>
    <Heading forwardedAs="h2">Meer weten?</Heading>
    <Paragraph>
      Wilt u weten hoe de aanvraag werkt, wat de kosten zijn of waar u nog meer
      aan moet denken als u gaat starten? Op onze pagina
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
