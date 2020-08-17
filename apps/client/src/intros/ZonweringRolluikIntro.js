import { Heading, Paragraph } from "@datapunt/asc-ui";
import React from "react";

import { List, ListItem } from "../atoms";
import Visual from "../components/Visual";
import Image4 from "../static/media/Uitleg_Luik.png";
import Image2 from "../static/media/Uitleg_Markies.png";
import Image3 from "../static/media/Uitleg_Rolluik.png";
import Image1 from "../static/media/Uitleg_Uitvalrol.png";
import LocationIntro from "./shared/LocationIntro";

export default () => (
  <>
    <LocationIntro />
    <Paragraph>
      U kunt de vergunningcheck gebruiken als u zonwering, rolhekken, rolluiken
      of luiken gaat plaatsen, vervangen of veranderen.
    </Paragraph>
    <Visual
      src={Image1}
      alt="Dit zijn voorbeelden van zonweringen"
      title="Dit zijn voorbeelden van zonweringen"
    />
    <Visual
      src={Image2}
      alt="Dit zijn voorbeelden van zonweringen"
      title="Dit zijn voorbeelden van zonweringen"
    />
    <Visual
      src={Image3}
      alt="Dit zijn voorbeelden van rolluiken"
      title="Dit zijn voorbeelden van rolluiken"
    />
    <Visual
      src={Image4}
      alt="Dit zijn voorbeelden van luiken"
      title="Dit zijn voorbeelden van luiken"
    />
    <Heading forwardedAs="h4">Bijzondere situaties:</Heading>
    <Paragraph gutterBottom={8}>
      Voor deze situaties kunt u de vergunningcheck niet gebruiken:
    </Paragraph>
    <List variant="bullet">
      <ListItem>Het aantal woningen verandert.</ListItem>
      <ListItem>
        Het deel van het gebouw waarin de zonwering, het rolhek, rolluik of luik
        komt, is zonder vergunning gebouwd.
      </ListItem>
    </List>

    <Paragraph>
      Hebt u een vraag of twijfelt u? Bel dan de gemeente op{" "}
      <a href="tel:14020">14 020</a>, maandag tot en met vrijdag van 08.00 uur
      tot 18.00 uur.
    </Paragraph>
  </>
);
