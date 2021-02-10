import apiTopics from "../topics.json";
import { TopicConfig, TopicType } from "../types";

class Topic {
  readonly intro?: string;
  readonly name: string;
  readonly slug: string;
  readonly text: any;
  readonly type: TopicType;

  constructor(config: TopicConfig) {
    this.intro = config.intro;
    this.name = config.name;
    this.slug = config.slug;
    this.text = config.text;
    this.type = config.type;
  }

  get hasIMTR(): boolean {
    return !!(
      this.slug && apiTopics.flat().find((api) => api.slug === this.slug)
    );
  }

  get isPermitCheck(): boolean {
    return this.type === TopicType.PERMIT_CHECK;
  }

  get isConfiguredPermitCheck(): boolean {
    return this.hasIMTR && this.isPermitCheck;
  }

  get isPermitForm(): boolean {
    return this.type === TopicType.PERMIT_FORM;
  }

  get isRedirect(): boolean {
    return this.type === TopicType.REDIRECT;
  }
}

export default Topic;
