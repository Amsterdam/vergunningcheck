export type Topic = {
  slug: string;
  name: String;
  hasSTTR: boolean;
  text: {
    heading: string;
    locationIntro?: string;
    addressPage?: string;
  };
  redirectToOlo?: boolean;
  intro?: string;
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
    slug: "kappen-of-snoeien",
    name: "Kappen of snoeien",
    hasSTTR: false,
    redirectToOlo: true,
    text: {
      heading: "Vergunningcheck kappen of snoeien",
    },
  },
  {
    slug: "dakkapel-plaatsen",
    name: "Dakkapel plaatsen",
    hasSTTR: true,
    text: {
      heading: "Vergunningcheck dakkapel plaatsen",
      locationIntro: "Voer het adres in waar u de dakkapel wilt gaan plaatsen",
      // @TODO: The text `addressPage` is now unused > What to do with this text?
      addressPage:
        "Gaat u meer dan 1 dakkapel plaatsen? Doe dan per dakkapel de vergunningcheck.",
    },
    intro: "DakkapelIntro",
  },
  {
    slug: "dakraam-plaatsen",
    name: "Dakraam plaatsen",
    hasSTTR: true,
    text: {
      heading: "Vergunningcheck dakraam plaatsen",
      locationIntro: "Voer het adres in waar u het dakraam wilt gaan plaatsen",
      // @TODO: The text `addressPage` is now unused > What to do with this text?
      addressPage:
        "Gaat u meer dan 1 dakraam plaatsen? Doe dan per dakraam de vergunningcheck.",
    },
    intro: "DakraamIntro",
  },
  {
    slug: "aanbouw-of-uitbouw-maken",
    name: "Aanbouw of uitbouw maken",
    hasSTTR: false,
    text: {
      heading: "Vergunningcheck aanbouw of uitbouw maken",
      locationIntro:
        "Voer het adres in waar u de aanbouw of uitbouw wilt gaan maken",
    },
    intro: "AanbouwIntro",
  },
  {
    slug: "kozijnen-plaatsen",
    name: "Kozijnen plaatsen",
    hasSTTR: true,
    text: {
      heading: "Vergunningcheck kozijnen plaatsen",
      locationIntro: "Voer het adres in waar u de kozijnen wilt gaan plaatsen",
    },
    intro: "KozijnenIntro",
  },
  {
    slug: "zonnepanelen-of-zonneboiler-plaatsen",
    name: "Zonnepanelen of zonneboiler plaatsen",
    hasSTTR: true,
    text: {
      heading: "Vergunningcheck zonnepanelen of zonneboiler plaatsen",
      locationIntro:
        "Voer het adres in waar u de zonnepanelen of zonneboiler wilt gaan plaatsen",
    },
    intro: "ZonnepanelenIntro",
  },
  {
    slug: "bouwwerk-slopen",
    name: "Bouwwerk slopen",
    hasSTTR: false,
    text: {
      heading: "Vergunningcheck bouwwerk slopen",
      locationIntro: "Voer het adres in waar u het bouwwerk wilt gaan slopen",
    },
    intro: "BouwwerkSlopenIntro",
  },
  {
    slug: "intern-verbouwen",
    name: "Intern verbouwen",
    hasSTTR: false,
    text: {
      heading: "Vergunningcheck intern verbouwen",
      locationIntro: "Voer het adres in waar u intern wilt gaan verbouwen",
    },
    intro: "InternVerbouwenIntro",
  },
  {
    slug: "zonwering-of-rolluik-plaatsen",
    name: "Zonwering of rolluik plaatsen",
    hasSTTR: true,
    text: {
      heading: "Vergunningcheck zonwering, rolhek, rolluik of luik plaatsen",
      locationIntro:
        "Voer het adres in waar u de zonwering, het rolhek, rolluik of luik wilt gaan plaatsen",
    },
    intro: "ZonweringRolluikIntro",
  },
];

// We need a place for general text as well
// I know this is not the best place
// For now I will place it here
export const requiredFieldText: string = "Dit veld is verplicht.";
