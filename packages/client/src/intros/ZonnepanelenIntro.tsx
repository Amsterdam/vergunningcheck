import React from "react";

import { Intro } from "./shared";

export default () => (
  <Intro
    // Not sure why we wouldn't want to show the contact information in this intro-page.
    // It's the only exception.
    showContactInformation={false}
    usableForBullets={[
      "het wijzigen van een monument.",
      "het plaatsen van de zonnepanelen of zonneboiler zelf.",
    ]}
    usableForText={`U kunt deze vergunningcheck gebruiken als u nieuwe zonnepanelen of een
      nieuwe zonneboiler plaatst of als u een bestaande vernieuwt.`}
  />
);
