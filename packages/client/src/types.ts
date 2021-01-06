import { Answer } from "@vergunningcheck/imtr-client";

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
  component?: (props: SectionComponent) => {};
  heading?: string;
  renderOutsideWrapper?: boolean;
};

export type SectionFunctions = {
  activateSection: (section: SectionObject) => void;
  completeSection: (state?: boolean, section?: SectionObject | null) => void;
  getNextSection: () => SectionObject | null;
  goToNextSection: () => void;
  goToPrevSection: () => void;
};

/**
 * Context and session types
 */

export type TopicData = {
  address: Address;
  answers: {
    [id: string]: Answer;
  };
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
  intro?: string;
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

export type Topic = OloTopic | IMTRTopic | RedirectToOloTopic;

/**
 * Checker related types
 */
export type BooleanOption = {
  formValue: string;
  label: string;
  value: boolean;
};
