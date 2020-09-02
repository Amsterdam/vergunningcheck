import React from "react";

import { Intro } from "./shared";

export default () => (
  <Intro
    usableForBullets={[
      "het wijzigen van een monument.",
      "het plaatsen van de dakkapel zelf.",
    ]}
    usableForText={`U kunt deze vergunningcheck gebruiken als u een nieuwe dakkapel plaatst of
        als u een bestaande vernieuwt.`}
    exceptions={[
      "U gaat de dakkapel plaatsen op een woonwagen, een tijdelijk gebouw of een vakantiehuis.",
      "Het aantal woningen verandert.",
      "Het deel van het gebouw waarin de dakkapel komt, is zonder vergunning gebouwd.",
    ]}
  />
);
