type Topic = {
  slug: string;
  sttrFile?: string;
  redirectToOlo?: boolean;
  intro?: string;
  text: Text;
};

type Text = {
  heading: string;
  locationIntro?: string;
  addressPage?: string;
};

export const isProduction: boolean =
  "vergunningcheck.amsterdam.nl" === window.location.hostname;

const oloHome: string =
  process.env.REACT_APP_OLO_URL || "https://www.omgevingsloket.nl/";

export const OLO: object = {
  home: oloHome,
  intro: `${oloHome}Particulier/particulier/home?init=true`,
  location: `${oloHome}Particulier/particulier/home/checken/LocatieWerkzaamheden`,
};

const topics: Topic[] = [
  {
    slug: "kappen-of-snoeien",
    redirectToOlo: true,
    text: {
      heading: "Kappen of snoeien",
    },
  },
  {
    slug: "dakkapel-plaatsen",
    sttrFile: "dakkapel.json",
    text: {
      heading: "Dakkapel plaatsen",
      locationIntro: "Voer het adres in waar u de dakkapel wilt gaan plaatsen",
      addressPage:
        "Gaat u meer dan 1 dakkapel plaatsen? Doe dan per dakkapel de vergunningcheck.",
    },
    intro: "DakkapelIntro",
  },
  {
    slug: "dakraam-plaatsen",
    sttrFile: "dakraam.json",
    text: {
      heading: "Dakraam plaatsen",
      locationIntro: "Voer het adres in waar u het dakraam wilt gaan plaatsen",
      addressPage:
        "Gaat u meer dan 1 dakraam plaatsen? Doe dan per dakraam de vergunningcheck.",
    },
    intro: "DakraamIntro",
  },
  {
    slug: "aanbouw-of-uitbouw-maken",
    text: {
      heading: "Aanbouw of uitbouw maken",
      locationIntro:
        "Voer het adres in waar u de aanbouw of uitbouw wilt gaan maken",
    },
    intro: "AanbouwIntro",
  },
  {
    slug: "kozijnen-plaatsen-of-vervangen",
    sttrFile: "kozijn.json",
    text: {
      heading: "Kozijnen plaatsen of vervangen",
      locationIntro:
        "Voer het adres in waar u de kozijnen wilt gaan plaatsen of vervangen",
    },
    intro: "KozijnenIntro",
  },
  {
    slug: "zonnepanelen-of-zonneboiler-plaatsen",
    sttrFile: "zonnepaneel.json",
    text: {
      heading: "Zonnepanelen of zonneboiler plaatsen",
      locationIntro:
        "Voer het adres in waar u de zonnepanelen of zonneboiler wilt gaan plaatsen",
    },
    intro: "ZonnepanelenIntro",
  },
  {
    slug: "bouwwerk-slopen",
    text: {
      heading: "Bouwwerk slopen",
      locationIntro: "Voer het adres in waar u het bouwwerk wilt gaan slopen",
    },
    intro: "BouwwerkSlopenIntro",
  },
  {
    slug: "intern-verbouwen",
    text: {
      heading: "Intern verbouwen",
      locationIntro: "Voer het adres in waar u intern wilt gaan verbouwen",
    },
    intro: "InternVerbouwenIntro",
  },
  {
    slug: "zonwering-of-rolluik-plaatsen",
    text: {
      heading: "Zonwering, rolhek, rolluik of luik plaatsen",
      locationIntro:
        "Voer het adres in waar u de zonwering, het rolhek, rolluik of luik wilt gaan plaatsen",
    },
    intro: "ZonweringRolluikIntro",
  },
];

if (process.env.NODE_ENV !== "production") {
  topics.push({
    slug: "test-outcomes",
    sttrFile: "outcomes.json",
    text: {
      heading: "Testing different outcomes/conclusions",
      locationIntro: "Pick a random address...",
    },
    intro: "DebugIntro",
  });
}

export { topics };

// We need a place for general text as well
// I know this is not the best place
// For now I will place it here
export const requiredFieldText: string = "Dit veld is verplicht.";
