import { Paragraph } from "@amsterdam/asc-ui";
import React from "react";
import { useTranslation } from "react-i18next";

export default () => {
  const { t } = useTranslation();

  return (
    <>
      <Paragraph>{t("introPage.slopen.need report")}</Paragraph>

      {/* TODO: move next paragraphs to translation files as soon as we have a solution to include <Markdown source..> */}
      <Paragraph>
        U hebt misschien een omgevingsvergunning nodig. Het kan ook zijn dat u
        de sloop moet melden. Met deze vergunningcheck kunt u zien wat u moet
        doen.
      </Paragraph>
      <Paragraph>
        Soms staat in het bestemmingsplan dat een vergunning nodig is. Deze
        vergunningcheck kijkt niet naar bestemmingsplannen. Nadat u alle vragen
        hebt beantwoord, leest u hoe u dat zelf kunt bekijken.
      </Paragraph>
    </>
  );
};
