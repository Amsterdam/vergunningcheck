export type Topic = {
  hasIMTR: boolean;
  intro?: string;
  name: string;
  redirectToOlo?: boolean;
  slug: string;
  text: {
    heading: string;
    locationIntro?: string;
  };
};

type OloProps = {
  home: string;
  intro: string;
  location: string;
};

type OloUrlProps = {
  houseNumber: string;
  houseNumberFull: string;
  postalCode: string;
};

export const isProduction: boolean =
  "vergunningcheck.amsterdam.nl" === window.location.hostname;

const oloHome: string =
  process.env.REACT_APP_OLO_URL || "https://www.omgevingsloket.nl/";

export const Olo: OloProps = {
  home: oloHome,
  intro: `${oloHome}Particulier/particulier/home?init=true`,
  location: `${oloHome}Particulier/particulier/home/checken/LocatieWerkzaamheden`,
};

export const generateOloUrl = ({
  houseNumber,
  houseNumberFull,
  postalCode,
}: OloUrlProps) => {
  // Get correct suffix
  const suffix = houseNumberFull.replace(houseNumber, "").trim();
  // Redirect user to OLO with all parameters
  return `${Olo.location}?param=postcodecheck&facet_locatie_postcode=${postalCode}&facet_locatie_huisnummer=${houseNumber}&facet_locatie_huisnummertoevoeging=${suffix}`;
};

export const topics: Topic[] = [
  {
    hasIMTR: false,
    name: "Kappen of snoeien",
    redirectToOlo: true,
    slug: "kappen-of-snoeien",
    text: {
      heading: "Vergunningcheck kappen of snoeien",
    },
  },
  {
    hasIMTR: true,
    intro: "DakkapelIntro",
    name: "Dakkapel plaatsen",
    slug: "dakkapel-plaatsen",
    text: {
      heading: "Vergunningcheck dakkapel plaatsen",
      locationIntro: "Voer het adres in waar u de dakkapel wilt gaan plaatsen",
    },
  },
  {
    hasIMTR: true,
    intro: "DakraamIntro",
    name: "Dakraam plaatsen",
    slug: "dakraam-plaatsen",
    text: {
      heading: "Vergunningcheck dakraam plaatsen",
      locationIntro: "Voer het adres in waar u het dakraam wilt gaan plaatsen",
    },
  },
  {
    hasIMTR: false,
    intro: "AanbouwIntro",
    name: "Aanbouw of uitbouw maken",
    slug: "aanbouw-of-uitbouw-maken",
    text: {
      heading: "Vergunningcheck aanbouw of uitbouw maken",
      locationIntro:
        "Voer het adres in waar u de aanbouw of uitbouw wilt gaan maken",
    },
  },
  {
    hasIMTR: true,
    intro: "KozijnenIntro",
    name: "Kozijnen plaatsen",
    slug: "kozijnen-plaatsen",
    text: {
      heading: "Vergunningcheck kozijnen plaatsen",
      locationIntro: "Voer het adres in waar u de kozijnen wilt gaan plaatsen",
    },
  },
  {
    hasIMTR: true,
    intro: "ZonnepanelenIntro",
    name: "Zonnepanelen of zonneboiler plaatsen",
    slug: "zonnepanelen-of-zonneboiler-plaatsen",
    text: {
      heading: "Vergunningcheck zonnepanelen of zonneboiler plaatsen",
      locationIntro:
        "Voer het adres in waar u de zonnepanelen of zonneboiler wilt gaan plaatsen",
    },
  },
  {
    hasIMTR: false,
    intro: "BouwwerkSlopenIntro",
    name: "Bouwwerk slopen",
    slug: "bouwwerk-slopen",
    text: {
      heading: "Vergunningcheck bouwwerk slopen",
      locationIntro: "Voer het adres in waar u het bouwwerk wilt gaan slopen",
    },
  },
  {
    hasIMTR: false,
    intro: "InternVerbouwenIntro",
    name: "Intern verbouwen",
    slug: "intern-verbouwen",
    text: {
      heading: "Vergunningcheck intern verbouwen",
      locationIntro: "Voer het adres in waar u intern wilt gaan verbouwen",
    },
  },
  {
    hasIMTR: true,
    intro: "ZonweringRolluikIntro",
    name: "Zonwering of rolluik plaatsen",
    slug: "zonwering-of-rolluik-plaatsen",
    text: {
      heading: "Vergunningcheck zonwering, rolhek, rolluik of luik plaatsen",
      locationIntro:
        "Voer het adres in waar u de zonwering, het rolhek, rolluik of luik wilt gaan plaatsen",
    },
  },
];

// We need a place for general text as well
// I know this is not the best place
// For now I will place it here
export const requiredFieldText: string = "Dit veld is verplicht.";
