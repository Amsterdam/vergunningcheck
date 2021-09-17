import { GraphQLTopic, PreQuestionComponent } from "../types";

class Topic {
  readonly hasIMTR: boolean;
  readonly name: string;
  readonly preQuestions?: PreQuestionComponent[];
  readonly slug: string;
  readonly text: any;
  readonly userMightNotNeedPermit?: boolean;

  constructor(config: GraphQLTopic) {
    this.hasIMTR = config.hasIMTR;
    this.name = config.name;
    this.preQuestions = config.preQuestions;
    this.slug = config.slug;
    this.text = config.text;
    this.userMightNotNeedPermit = config.userMightNotNeedPermit;
  }

  get preQuestionsCount(): number {
    // Returns the amount of `preQuestions`
    return this.preQuestions?.length || 0;
  }
}

export default Topic;
