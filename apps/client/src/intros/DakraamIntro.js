import React from "react";

import { Intro } from "./shared";

export default () => (
  <Intro
    usableForBullets={[
      "het wijzigen van een monument.",
      "het plaatsen van het dakraam zelf.",
    ]}
    usableForText={`Deze vergunningcheck gaat over dakramen, daklichten en lichtstraten. U
    kunt hem gebruiken als u een nieuwe plaatst of als u een bestaande
    vernieuwt.`}
    exceptions={[
      "Het aantal woningen verandert.",
      "Het deel van het gebouw waarin het dakraam komt, is zonder vergunning gebouwd.",
    ]}
  />
);
