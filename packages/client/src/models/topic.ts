import apiTopics from "../topics.json";
import { PreQuestionComponent, TopicConfig, TopicType } from "../types";

class Topic {
  readonly intro?: string;
  readonly name: string;
  readonly preQuestions?: PreQuestionComponent[];
  readonly slug: string;
  readonly text: any;
  readonly type: TopicType;
  readonly userMightNotNeedPermit?: boolean;

  constructor(config: TopicConfig) {
    this.intro = config.intro;
    this.name = config.name;
    this.preQuestions = config.preQuestions;
    this.slug = config.slug;
    this.text = config.text;
    this.type = config.type;
    this.userMightNotNeedPermit = config.userMightNotNeedPermit;
  }

  get hasIMTR(): boolean {
    // This validates if the current topic has a transformed IMTR file
    return !!(
      this.slug && apiTopics.flat().find((api) => api.slug === this.slug)
    );
  }

  get isPermitCheck(): boolean {
    return this.type === TopicType.PERMIT_CHECK;
  }

  get isConfiguredPermitCheck(): boolean {
    // This validates if the current topic is configured as a PermitCheck and `hasIMTR`
    return this.hasIMTR && this.isPermitCheck;
  }

  get isPermitForm(): boolean {
    // A PermitForm is in case a PermitCheck has a `NEED_PERMIT` (see enum TopicType for more info)
    return this.type === TopicType.PERMIT_FORM;
  }

  get isRedirect(): boolean {
    // A redirect is a PermitCheck we don't support yet (see enum TopicType for more info)
    return this.type === TopicType.REDIRECT;
  }

  get preQuestionsCount(): number {
    // Returns the amount of `preQuestions`
    return this.preQuestions?.length || 0;
  }
}

export default Topic;
