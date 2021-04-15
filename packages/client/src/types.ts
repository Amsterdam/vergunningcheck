import { Answer as IMTRAnswer } from "@vergunningcheck/imtr-client";
import { ReactNode } from "react";

/**
 * Location types
 */
export type Restriction = {
  __typename?: string;
  name?: string;
  scope?: string;
};

export type ZoningPlan = {
  __typename?: string;
  name?: string;
  scope?: string;
};

export type AddressType = {
  __typename?: string;
  districtName: string;
  houseNumber: number;
  houseNumberFull: string;
  id: string;
  neighborhoodName: string;
  postalCode: string;
  residence: string;
  restrictions: Restriction[];
  streetName: string;
  zoningPlans: ZoningPlan[];
};

export type Address = null | AddressType;

/**
 * Section types
 */

export type SectionComponent = {
  currentSection: SectionObject;
  sectionFunctions: SectionFunctions;
};

type SectionData = {
  index: number;
  isActive: boolean;
  isCompleted: boolean;
};

export type SectionObject = SectionData & {
  component: (props: SectionComponent) => {};
};

export type SectionFunctions = {
  changeActiveSection: (section: SectionObject) => void;
  completeSection: (state?: boolean, section?: SectionObject | null) => void;
  getNextSection: () => SectionObject | null;
  goToNextSection: () => void;
};

/**
 * Context and session types
 */
export type TopicData = {
  address: Address;
  answers: {
    [id: string]: IMTRAnswer;
  };
  timesCheckerLoaded: number;
  sectionData: SectionData[];
  type: string;
  questionIndex: number;
};

export type setTopicFn = (topicData: Partial<TopicData>) => void;
export type setSessionFn = (sessionData: Partial<SessionData>) => void;

export type SessionData = {
  [slug: string]: null | TopicData;
};

export type setTopicSessionDataFn = (
  topicData: null | Partial<TopicData>
) => void;

/**
 * Topic types
 */
type BaseTopic = {
  name: string;
  slug: string;
  text: {
    heading: string;
    locationIntro?: string;
  };
};

type IMTRTopic = {
  hasIMTR: true;
  intro: string;
  redirectToOlo?: false;
} & BaseTopic;

type OloTopic = {
  hasIMTR: false;
  intro?: string;
  redirectToOlo?: false;
} & BaseTopic;

type RedirectToOloTopic = {
  hasIMTR: false;
  redirectToOlo: true;
  intro?: undefined;
} & BaseTopic;

/**
 * Merge the different topic types
 *
 * hasIMTR: If topic has an imtr-file. If `false` it's olo/olo-redirect flow
 * intro: The name of the component that has all texts on the Intro page
 * name: The name of the checker/topic
 * redirectToOlo: If this flow should redirect the user to OLO
 * slug: The part of our app URL that identifies which permit-checker to load (`dakraam-plaatsen` will be `https://vergunningcheck.amsterdam.nl/dakraam-plaatsen`)
 * text: This is part that holds specific texts for each permit-checker
 */
export type Topic = OloTopic | IMTRTopic | RedirectToOloTopic;

/**
 * Checker related types
 */
export type Answer = {
  formValue: string;
  label: string;
  value: boolean | string;
};

/**
 * Content related types
 */
export type OutcomeContentType = {
  description?: string;
  eventName?: string;
  footerContent?: ReactNode;
  mainContent?: ReactNode;
  title: string;
};
