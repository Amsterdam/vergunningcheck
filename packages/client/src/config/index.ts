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
