import Topic from "../models/topic";
import { TopicType } from "../types";

/**
 * PreQuestions enable us to configure custom questions before the IMTR questions. We will use these questions to customise the Outcome Section.
 *
 * Direct importing and including components does not work because the hooks lose context.
 */
export enum PreQuestionComponent {
  MULTIPLE_CHECKERS, // Corresponds to PreQuestionMultipleCheckers.tsx
  ARE_YOU_SURE, // Corresponds to PreQuestionAreYouSure.tsx
}

/**
 * Merge the different topic types
 *
 * intro: The name of the component that has all texts on the Intro page
 * name: The name of the checker/topic
 * preQuestions: Question Components to render before the actual IMTR questions. See `PreQuestionComponent` above
 * slug: The part of our app URL that identifies which permit-checker to load (`dakraam-plaatsen` will be `https://vergunningcheck.amsterdam.nl/dakraam-plaatsen`)
 * text: This is part that holds specific texts for each permit-checker
 * type: See {TopicType} for the different types of Topic
 * userMightNotNeedPermit: Enables an add-on text in the QuestionAlert: "if you make another choice you might not need a permit"
 */
export const topics: Topic[] = [
  {
    intro: "DakkapelIntro",
    name: "Dakkapel plaatsen",
    preQuestions: [
      PreQuestionComponent.MULTIPLE_CHECKERS,
      PreQuestionComponent.ARE_YOU_SURE,
    ],
    slug: "dakkapel-plaatsen",
    text: {
      heading: "Vergunningcheck dakkapel plaatsen",
      locationIntro: "Voer het adres in waar u de dakkapel wilt gaan plaatsen",
    },
    type: TopicType.PERMIT_CHECK,
    userMightNotNeedPermit: true,
  },
  {
    intro: "DakraamIntro",
    name: "Dakraam plaatsen",
    preQuestions: [PreQuestionComponent.MULTIPLE_CHECKERS],
    slug: "dakraam-plaatsen",
    text: {
      heading: "Vergunningcheck dakraam plaatsen",
      locationIntro: "Voer het adres in waar u het dakraam wilt gaan plaatsen",
    },
    type: TopicType.PERMIT_CHECK,
    userMightNotNeedPermit: true,
  },
  {
    name: "Aanbouw of uitbouw maken",
    slug: "aanbouw-of-uitbouw-maken",
    text: {
      heading: "Vergunningcheck aanbouw of uitbouw maken",
      locationIntro:
        "Voer het adres in waar u de aanbouw of uitbouw wilt gaan maken",
    },
    type: TopicType.PERMIT_CHECK,
    userMightNotNeedPermit: true,
  },
  {
    intro: "KozijnenIntro",
    name: "Kozijnen plaatsen",
    preQuestions: [PreQuestionComponent.MULTIPLE_CHECKERS],
    slug: "kozijnen-plaatsen",
    text: {
      heading: "Vergunningcheck kozijnen plaatsen",
      locationIntro: "Voer het adres in waar u de kozijnen wilt gaan plaatsen",
    },
    type: TopicType.PERMIT_CHECK,
    userMightNotNeedPermit: true,
  },
  {
    intro: "ZonnepanelenIntro",
    name: "Zonnepanelen of zonneboiler plaatsen",
    preQuestions: [PreQuestionComponent.MULTIPLE_CHECKERS],
    slug: "zonnepanelen-of-zonneboiler-plaatsen",
    text: {
      heading: "Vergunningcheck zonnepanelen of zonneboiler plaatsen",
      locationIntro:
        "Voer het adres in waar u de zonnepanelen of zonneboiler wilt gaan plaatsen",
    },
    type: TopicType.PERMIT_CHECK,
    userMightNotNeedPermit: true,
  },
  {
    intro: "SlopenIntro",
    name: "Bouwwerk slopen",
    slug: "bouwwerk-slopen",
    text: {
      heading: "Vergunningcheck bouwwerk slopen",
      locationIntro: "Voer het adres in waar u het bouwwerk wilt gaan slopen",
    },
    type: TopicType.PERMIT_CHECK,
  },
  {
    name: "Intern verbouwen",
    slug: "intern-verbouwen",
    text: {
      heading: "Vergunningcheck intern verbouwen",
      locationIntro: "Voer het adres in waar u intern wilt gaan verbouwen",
    },
    type: TopicType.PERMIT_CHECK,
  },
  {
    intro: "ZonweringRolluikIntro",
    name: "Zonwering of rolluik plaatsen",
    preQuestions: [PreQuestionComponent.MULTIPLE_CHECKERS],
    slug: "zonwering-of-rolluik-plaatsen",
    text: {
      heading: "Vergunningcheck zonwering, rolhek, rolluik of luik plaatsen",
      locationIntro:
        "Voer het adres in waar u de zonwering, het rolhek, rolluik of luik wilt gaan plaatsen",
    },
    type: TopicType.PERMIT_CHECK,
    userMightNotNeedPermit: true,
  },
  {
    name: "Kappen of snoeien",
    slug: "kappen-of-snoeien",
    text: {
      heading: "Vergunningcheck kappen of snoeien",
    },
    type: TopicType.REDIRECT,
  },
  {
    intro: "BrandveiligGebruikIntro",
    name: "Brandveilig gebruik",
    slug: "brandveilig-gebruik",
    text: {
      heading: "Vergunningcheck brandveilig gebruik",
    },
    type: TopicType.PERMIT_CHECK,
  },
].map((t) => new Topic(t));

// Is the client running on production?
export const isProduction: boolean =
  "vergunningcheck.amsterdam.nl" === window.location.hostname;

// URLS used throughout the client
export const oloHome: string = "https://www.omgevingsloket.nl/";

export const urls = {
  DEMOLITION_PERMIT_PAGE:
    "https://www.amsterdam.nl/veelgevraagd/?caseid=%7BAEA35C69-4DAD-483E-8AA1-C068D88B792C%7D",
  FIRESAFETY_PAGE:
    "https://www.amsterdam.nl/veelgevraagd/?productid=%7B1DA41981-4A37-457D-A57C-0E202F43C60B%7D",
  GENERAL_PERMIT_PAGE:
    "https://www.amsterdam.nl/veelgevraagd/?productid=%7B215DE049-EFA3-492D-A4B1-EDFF40E0BC51%7D",
  OLO_HOME: oloHome,
  OLO_INTRO: `${oloHome}Particulier/particulier/home?init=true`,
  OLO_LOCATION: `${oloHome}Particulier/particulier/home/checken/LocatieWerkzaamheden`,
  VIEW_ZONING_PLAN:
    "https://www.amsterdam.nl/veelgevraagd/?productid=%7bC25A69DB-3548-4E12-97BB-DB71318EDFB2%7d",
};

type OloUrlProps = {
  houseNumber: number;
  houseNumberFull: string;
  postalCode: string;
};

export const generateOloUrl = ({
  houseNumber,
  houseNumberFull,
  postalCode,
}: OloUrlProps) => {
  // Get correct suffix
  const suffix = houseNumberFull.replace(houseNumber.toString(), "").trim();
  // Redirect user to OLO with all parameters
  return `${urls.OLO_LOCATION}?param=postcodecheck&facet_locatie_postcode=${postalCode}&facet_locatie_huisnummer=${houseNumber}&facet_locatie_huisnummertoevoeging=${suffix}`;
};
