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
 * Context and session types
 */
export type TopicData = {
  activeComponents?: string[];
  address: Address;
  answers: {
    [id: string]: Answer;
  };
  finishedComponents: string[];
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
