import * as imtr from "@vergunningcheck/imtr-client";
import { ReactNode } from "react";

import { PreQuestionComponent } from "./config";

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
  name: string;
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
    [id: string]: imtr.Answer;
  };
  questionIndex: number;
  questionMultipleCheckers?: AnswerValue;
  sectionData: SectionData[];
  timesLoaded: number;
  type: string;
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
export enum TopicType {
  PERMIT_CHECK, // A permit-check that is either an "OLO flow" or an "IMTR flow" check. IMTR checks are configured in `packages/imtr/src/config`.
  PERMIT_FORM, // A permit-form - required when PERMIT_NEEDED - with the main focus on generating a PDF
  REDIRECT, // A direct redirect to "OLO". We only use this to track the visitor count from amsterdam.nl
}

export type TopicConfig = {
  intro?: string;
  name: string;
  preQuestions?: PreQuestionComponent[];
  slug: string;
  text: {
    heading: string;
    locationIntro?: string;
  };
  type: TopicType;
  userMightNotNeedPermit?: boolean;
};

export type PreQuestionFunctions = {
  editQuestion: (index: number) => void;
  goToNextQuestion: () => void;
  isCheckerConclusive: () => boolean;
  saveAnswer: (answer: Answer) => void;
};

// This is an imported topic from the Flo Legal api
export type ApiTopic = {
  name?: string;
  path?: string;
  permits: string[];
  slug: string;
};

/**
 * Checker related types
 */

export type QuestionAlert = {
  questionAnswer: boolean;
  text: string;
};

export type AnswerValue = boolean | string;

export type Answer = {
  formValue?: string; // This is only used for Radio / Checkbox answers
  label: string;
  value: AnswerValue;
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
