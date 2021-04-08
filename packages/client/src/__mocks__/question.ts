import * as imtr from "@vergunningcheck/imtr-client";
import { FieldErrors } from "react-hook-form";

export const booleanQuestion: imtr.Question = {
  __type: "Question",
  answer: undefined,
  collection: false,
  description:
    "![](https://sttr-files.flolegal.app/00000001002564440000/12_Dakraam_afstand_tot_randen_plat_dak_v3.png)↵↵U meet deze afstanden tot de randen van uw dak.",
  id: "uitv__e1e70be6-dc15-4b9b-9ef3-ebe8eddc63ad",
  longDescription:
    "Een van de voorwaarden om het dakraam vergunningvrij te mogen plaatsen is dat deze meer dan 50 centimeter van alle dakranden wordt geplaatst. Hierdoor wordt het dakraam minder zichtbaar voor de omgeving en hebben de buren er minder last van.",
  options: undefined,
  prio: 130,
  text:
    "Worden de afstanden van het dakraam tot aan alle randen van uw dak meer dan 50 centimeter?",
  type: "boolean",
  setAnswer: () => {},
};

export const booleanQuestionError: FieldErrors = {
  [booleanQuestion.id]: {
    message: "Maak een keuze",
    type: "required",
  },
};

export const booleanQuestionAsJson = {
  text:
    "Staat het gebouw waarop u de dakkapel gaat plaatsen in een gebied waar gemeentelijke regels gelden voor het uiterlijk van gebouwen?",
  description:
    "In bijna heel Amsterdam gelden regels voor het uiterlijk van gebouwen. In een klein aantal gebieden gelden er geen regels. We noemen die gebieden welstandsvrij. [Op de kaart](https://maps.amsterdam.nl/welstand/?LANG=nl&L=11) staan de gebieden waar geen regels gelden. Valt u daar buiten, dan beantwoordt u de vraag met ‘ja’.",
  type: "boolean",
  id: "uitv__51fe2afb-ebfa-48e0-b81d-822c38eaf87a",
  prio: 10010,
};

export const listQuestionAsJson = {
  text: "Is het gebouw een monument?",
  description: "Het rijk of de gemeente kan een gebouw als monument aanwijzen.",
  autofill: "monumentList",
  options: ["Rijksmonument", "Gemeentelijk monument", "Geen monument"],
  type: "string",
  id: "uitv__cfd21373-8a4f-4c9f-b56c-d4c7730bada3",
  prio: 10,
  uuid: "dakkapel monument",
};
