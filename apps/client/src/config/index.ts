type Topic = {
  intro?: string;
  name: string;
  redirectToOlo?: boolean;
  slug: string;
  sttrFile?: string;
  text: Text;
};

type Text = {
  heading: string;
  locationIntro?: string;
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

const topics: Topic[] = [
  {
    name: "Kappen of snoeien",
    redirectToOlo: true,
    slug: "kappen-of-snoeien",
    text: {
      heading: "Vergunningcheck kappen of snoeien",
    },
  },
  {
    intro: "DakkapelIntro",
    name: "Dakkapel plaatsen",
    slug: "dakkapel-plaatsen",
    sttrFile: "dakkapel.json",
    text: {
      heading: "Vergunningcheck dakkapel plaatsen",
      locationIntro: "Voer het adres in waar u de dakkapel wilt gaan plaatsen",
    },
  },
  {
    intro: "DakraamIntro",
    name: "Dakraam plaatsen",
    slug: "dakraam-plaatsen",
    sttrFile: "dakraam.json",
    text: {
      heading: "Vergunningcheck dakraam plaatsen",
      locationIntro: "Voer het adres in waar u het dakraam wilt gaan plaatsen",
    },
  },
  {
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
    intro: "KozijnenIntro",
    name: "Kozijnen plaatsen",
    slug: "kozijnen-plaatsen",
    sttrFile: "kozijn.json",
    text: {
      heading: "Vergunningcheck kozijnen plaatsen",
      locationIntro: "Voer het adres in waar u de kozijnen wilt gaan plaatsen",
    },
  },
  {
    intro: "ZonnepanelenIntro",
    name: "Zonnepanelen of zonneboiler plaatsen",
    slug: "zonnepanelen-of-zonneboiler-plaatsen",
    sttrFile: "zonnepaneel.json",
    text: {
      heading: "Vergunningcheck zonnepanelen of zonneboiler plaatsen",
      locationIntro:
        "Voer het adres in waar u de zonnepanelen of zonneboiler wilt gaan plaatsen",
    },
  },
  {
    intro: "BouwwerkSlopenIntro",
    name: "Bouwwerk slopen",
    slug: "bouwwerk-slopen",
    text: {
      heading: "Vergunningcheck bouwwerk slopen",
      locationIntro: "Voer het adres in waar u het bouwwerk wilt gaan slopen",
    },
  },
  {
    intro: "InternVerbouwenIntro",
    name: "Intern verbouwen",
    slug: "intern-verbouwen",
    text: {
      heading: "Vergunningcheck intern verbouwen",
      locationIntro: "Voer het adres in waar u intern wilt gaan verbouwen",
    },
  },
  {
    intro: "ZonweringRolluikIntro",
    name: "Zonwering of rolluik plaatsen",
    slug: "zonwering-of-rolluik-plaatsen",
    sttrFile: "zonwering.json",
    text: {
      heading: "Vergunningcheck zonwering, rolhek, rolluik of luik plaatsen",
      locationIntro:
        "Voer het adres in waar u de zonwering, het rolhek, rolluik of luik wilt gaan plaatsen",
    },
  },
];

if (process.env.NODE_ENV !== "production") {
  topics.push({
    intro: "DebugIntro",
    name: "Test outcomes",
    slug: "test-outcomes",
    sttrFile: "outcomes.json",
    text: {
      heading: "Testing different outcomes/conclusions",
      locationIntro: "Pick a random address...",
    },
  });
}

export { topics };

// We need a place for general text as well
// I know this is not the best place
// For now I will place it here
export const requiredFieldText: string = "Dit veld is verplicht.";
