import React from "react";

import { Intro } from "./shared";

export default () => (
  <Intro
    usableForBullets={[
      "het wijzigen van een monument.",
      "het plaatsen van de kozijnen zelf.",
    ]}
    usableForText={`Deze vergunningcheck gaat over kozijnen, deuren, ramen en panelen. U kunt
      hem gebruiken als u nieuwe plaatst of als u bestaande vernieuwt.`}
    exceptions={[
      "Het aantal woningen verandert.",
      "Het gebouw, of het deel van het gebouw waarin het kozijn komt, is zonder vergunning gebouwd.",
    ]}
  />
);
