import React from "react";

import { Intro } from "./shared";

export default () => (
  <Intro
    usableForBullets={[
      "het wijzigen van een monument.",
      "het plaatsen van de zonwering, het rolhek, rolluik of luik zelf.",
    ]}
    usableForText={`U kunt deze vergunningcheck gebruiken als u een nieuwe
      zonwering, rolhek, rolluik of luik plaatst of als u een bestaande
      vernieuwt.`}
    exceptions={[
      "Het aantal woningen verandert.",
      `Het gebouw, of het deel van het gebouw waarin de zonwering, het rolhek,
        rolluik of luik komt, is zonder vergunning gebouwd.`,
    ]}
  />
);
