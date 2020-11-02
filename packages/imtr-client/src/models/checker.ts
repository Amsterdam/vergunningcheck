import { Answer, Input } from "../types";
import { collectionOfType, isObject } from "../utils";
import Decision, { InputReducer } from "./decision";
import Permit from "./permit";
import Question from "./question";

export const imtrOutcomes = {
  NEED_PERMIT: '"Vergunningplicht"',
  NEED_CONTACT: '"NeemContactOpMet"',
  PERMIT_FREE: '"Toestemmingsvrij"',
};

export type AutofillData = {
  address?: any; // eslint-disable-line
};
export type Resolver = (
  autofillData: AutofillData,
  question: Question
) => Answer;
export type AnswerDict = { [id: string]: Answer };
export type AutofillResolverMap = { [name: string]: Resolver };

/**
 * Step checker class for checker
 */
export default class Checker {
  readonly permits: Permit[];
  private _stack: Question[] = [];
  private autofillData = "";
  private done = false;

  /**
   * Constructor for Checker
   * @param permits - Permits for this checker
   */
  constructor(permits: Permit[]) {
    if (!collectionOfType(permits, "Permit")) {
      throw Error("'permits' must be an array of type 'Permit'");
    }

    // Store permits by number of questions
    this.permits = permits.sort(
      (a, b) => a.questions.length - b.questions.length
    );
  }

  /**
   * @returns - a list of questions in the stack
   */
  get stack(): Question[] {
    return this._stack;
  }

  /**
   * Returns a list of questionIds with the given answers.
   * Useful to store in React.Context or in sessionStorage
   *
   * @returns {({string: boolean|string|number|[string]})}  - a list of answers
   */
  getQuestionAnswers(): AnswerDict {
    return this.stack
      .concat(this._getUpcomingQuestions()) // Merge the stack with upcoming questions to get all questions
      .reduce((acc: AnswerDict, question: Question) => {
        acc[question.id] = question.answer;
        return acc;
      }, {});
  }

  /**
   * Loops through all questions and answers these questions based on provided `answers`
   * Useful when you have stored the user answers and want to continue a particular session
   */
  setQuestionAnswers(answers: AnswerDict): void {
    if (!isObject(answers)) {
      throw Error("Answers must be of type object");
    }

    // Load the first question
    if (!this.last) {
      this.next();
    }

    let done = false;
    let prevId = null;

    // Loop through `imtr-checker` and answer all questions provided by `answers`
    while (done === false) {
      const questionAnswer = answers[this.last.id];

      // The checker is completed when `questionAnswer` is undefined
      // or if the same question is handled again (to allow `Contact` conclusions)
      if (questionAnswer === undefined || prevId === this.last.id) {
        done = true;
      } else {
        // Answer the question and proceed
        prevId = this.last.id;
        this.last.setAnswer(questionAnswer);
        this.next();
      }
    }
  }

  /**
   * @returns {Question} - last question in the stack
   */
  get last(): Question {
    return this.stack[this.stack.length - 1];
  }

  /**
   * Find all permits that have a "contact" conclusion,
   * for every permit see if the decisive decision's last question
   * equals the currentQuestion.
   *
   * @param currentQuestion - the question to check for exit
   *
   * @returns if checker has a 'contact' outcome
   * consumer can exit if wanted
   */
  needContactExit(currentQuestion: Question): boolean {
    return !!this.permits.find((permit) => {
      const conclusion = permit.getDecisionById("dummy") as Decision;
      const conclusionMatchingRules = conclusion.getMatchingRules();
      const matchingContactRule = conclusionMatchingRules.find(
        (rule) => rule.outputValue === imtrOutcomes.NEED_CONTACT
      );
      if (matchingContactRule) {
        const decisiveDecisions = conclusion.getDecisiveInputs() as Decision[];

        // find the contact decision
        const contactDecision = decisiveDecisions.find((decision) =>
          decision.rules.find(
            (rule) => rule.outputValue === imtrOutcomes.NEED_CONTACT
          )
        ) as Decision;

        // get inputs from contact decision
        const lastIndex = contactDecision.inputs.length - 1;
        // if currentQuestion equals the last input in decision, it's a match
        return contactDecision.inputs[lastIndex] === currentQuestion;
      }
      return false;
    });
  }

  /**
   * We consider a checker to be finished or conclusive when either we
   * have one or more permits with a contact-outcome, or all permits
   * have a conclusion.
   * @returns Returns true if "at least one" of the permits inside checker has a final outcome
   */
  isConclusive(): boolean {
    const hasContactPermit = !!this.permits.find(
      (permit) =>
        permit.getOutputByDecisionId("dummy") === imtrOutcomes.NEED_CONTACT
    );
    const hasUnfinishedPermits = !!this.permits.find(
      (permit) => !permit.getOutputByDecisionId("dummy")
    );

    return !hasUnfinishedPermits || hasContactPermit;
  }

  /**
   * For every questions see if we have autofillData
   * and see if the question can be autofilled
   *
   * @param resolvers - A map of {[name]: resolver(autofillData)}
   * @param autofillData - the autofill data that will be send to the resolver
   **/
  autofill(resolvers: AutofillResolverMap, autofillData: AutofillData): void {
    if (JSON.stringify(autofillData) !== this.autofillData) {
      this._getAllQuestions().forEach((question) => {
        if (question.autofill) {
          const resolver = resolvers[question.autofill];
          const answer = resolver
            ? resolver(autofillData, question)
            : undefined;
          if (answer !== undefined) {
            question.setAnswer(answer);
          }
        }
      });
      this.autofillData = JSON.stringify(autofillData);
    }
  }

  /**
   * Rewind to a question in the stack
   *
   * @param index - The index in the stack to rewind to
   * @returns The last question in the stack
   */
  rewindTo(index: number): Question {
    const lastIndex = this.stack.length - 1;
    if (index < 0) {
      throw Error("'rewindTo' index cannot be less then 0");
    }
    if (index > lastIndex) {
      throw Error(
        `'rewindTo' index (${index}) cannot be bigger then the last index (${lastIndex})`
      );
    }
    this.stack.splice(index + 1);
    this.done = false;
    return this.last;
  }

  /**
   * Rewind to the previous question. If the checker is done/finished
   * we rewind to the latest in the stack.
   * @returns The previous question
   */
  previous(): Question {
    return this.rewindTo(this.stack.length - (this.done === true ? 1 : 2));
  }

  /**
   * Find all data needs
   * @param autofillMap the resolver map to determine if we can autofill
   * @param onlyMissing return all or only missing dataneeds
   */
  getAutofillDataNeeds(
    autofillMap: AutofillResolverMap,
    onlyMissing = false
  ): Resolver[] {
    const resolvers = this._getAllQuestions()
      .filter(({ autofill }) => autofill !== undefined)
      .filter(({ answer }) => (onlyMissing ? answer === undefined : true))
      .map((question: Question) => autofillMap[question.autofill as string]);
    return [...new Set(resolvers)];
  }

  /**
   * Util function to deduplicate a question list, sort it by prio
   *
   * @param questions - the list of questions
   */
  dedupeAndSortQuestions(questions: Question[]): Question[] {
    return [...new Set(questions)].sort((a, b) => a.prio - b.prio);
  }

  /**
   * Get all decisions for the conclusion of every permit.
   */
  _getConclusionDecisions(): Decision[] {
    return this.permits
      .map((permit) => permit.getDecisionById("dummy"))
      .flatMap((conclusion) => (conclusion as Decision).inputs) as Decision[];
  }

  /**
   * Get all questions for the permits in this checker
   */
  _getAllQuestions(): Question[] {
    // for every unanswsered decision in 'conclusion' we push it's questions on
    // our accumulator, but only if it's not already on the stack
    return this.dedupeAndSortQuestions(
      this._getConclusionDecisions().flatMap((decision) =>
        decision.getQuestions()
      )
    );
  }

  /**
   * Get unanswered questions that we need before the checker is final
   */
  _getUpcomingQuestions(): Question[] {
    // take only questions/inputs into concideration that are autofilled or answered by the user
    const inputReducer: InputReducer = (input: Input) => {
      return this.stack.includes(input as Question) ||
        (input as Question).autofill
        ? input
        : null;
    };

    // for every unanswsered decision in 'conclusion' we push it's questions on
    // our accumulator, but only if it's not already on the stack
    return this.dedupeAndSortQuestions(
      this._getConclusionDecisions()
        .filter((d) => d.getMatchingRules(inputReducer).length === 0)
        .flatMap((decision) => decision.getQuestions())
        .filter((q) => !this.stack.includes(q) || q.autofill)
    ).filter((q) => !q.autofill);
  }

  /**
   * Our current implementation of getNextQuestion basically returns any question that is
   * not answered no matter if they make any impact on the outcome. So user always has to
   * answer all the questions.
   *
   * @returns - the next question for this checker
   */
  _getNextQuestion(): Question | undefined {
    return this._getUpcomingQuestions().shift();
  }

  /**
   * Get the next question for this checker
   *
   * @returns {!(Question|null)} The next question or null if done
   */
  next(): Question | null {
    if (this.last !== undefined && this.last.answer === undefined) {
      throw Error(`Please answer the question first ${this.last}`);
    }
    const question = this._getNextQuestion();
    if (question) {
      this._stack.push(question);
    } else {
      this.done = true;
    }
    return question || null;
  }
}
