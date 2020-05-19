export const isProduction = "vergunningcheck.nl" === window.location.hostname;

export const matomo = {
  urlBase: "https://analytics.data.amsterdam.nl/",
  siteId: isProduction ? 29 : 37,
};

const oloHome =
  process.env.REACT_APP_OLO_URL || "https://www.omgevingsloket.nl/";

export const OLO = {
  home: oloHome,
  intro: `${oloHome}Particulier/particulier/home/checken`,
  location: `${oloHome}Particulier/particulier/home/checken/LocatieWerkzaamheden`,
};

const topics = [
  {
    slug: "kappen-of-snoeien",
    redirectToOlo: true,
    text: {
      heading: "Vergunningcheck kappen of snoeien",
    },
  },
  {
    slug: "dakkapel-plaatsen",
    sttrFile: "dakkapel.json",
    text: {
      heading: "Vergunningcheck dakkapel plaatsen",
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
      heading: "Vergunningcheck dakraam plaatsen",
      locationIntro: "Voer het adres in waar u het dakraam wilt gaan plaatsen",
      addressPage:
        "Gaat u meer dan 1 dakraam plaatsen? Doe dan per dakraam de vergunningcheck.",
    },
    intro: "DakraamIntro",
  },
  {
    slug: "aanbouw-of-uitbouw-maken",
    text: {
      heading: "Vergunningcheck aanbouw of uitbouw maken",
      locationIntro:
        "Voer het adres in waar u de aanbouw of uitbouw wilt gaan maken",
    },
    intro: "AanbouwIntro",
  },
  {
    slug: "kozijnen-plaatsen-of-vervangen",
    text: {
      heading: "Vergunningcheck kozijnen plaatsen of vervangen",
      locationIntro:
        "Voer het adres in waar u de kozijnen wilt gaan plaatsen of vervangen",
    },
    intro: "KozijnenIntro",
  },
  {
    slug: "kozijn-test",
    sttrFile: "kozijn.json",
    text: {
      heading: "Vergunningcheck kozijnen plaatsen of vervangen",
      locationIntro:
        "Voer het adres in waar u de kozijnen wilt gaan plaatsen of vervangen",
    },
    intro: "KozijnenIntroTest",
  },
  {
    slug: "zonnepanelen-of-warmtecollectoren-plaatsen",
    sttrFile: "zonnepaneel.json",
    text: {
      heading: "Vergunningcheck zonnepanelen of warmtecollectoren plaatsen",
      locationIntro:
        "Voer het adres in waar u de zonnepanelen of warmtecollectoren wilt gaan plaatsen",
    },
    intro: "ZonnepanelenIntro",
  },
  {
    slug: "bouwwerk-slopen",
    text: {
      heading: "Vergunningcheck bouwwerk slopen",
      locationIntro: "Voer het adres in waar u het bouwwerk wilt gaan slopen",
    },
    intro: "BouwwerkSlopenIntro",
  },
  {
    slug: "intern-verbouwen",
    text: {
      heading: "Vergunningcheck intern verbouwen",
      locationIntro: "Voer het adres in waar u intern wilt gaan verbouwen",
    },
    intro: "InternVerbouwenIntro",
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
export const requiredFieldText = "Dit veld is verplicht.";
