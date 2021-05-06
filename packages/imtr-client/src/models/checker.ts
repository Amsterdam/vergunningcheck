import { Rule } from "../..";
import { Answer, Input, Outcome } from "../types";
import { collectionOfType, isObject, removeQuotes } from "../utils";
import Decision, { InputReducer } from "./decision";
import Permit from "./permit";
import Question from "./question";

export const outcomes = {
  NEED_CONTACT: '"NeemContactOpMet"',
  NEED_PERMIT: '"Vergunningplicht"',
  NEED_REPORT: '"Meldingsplicht"',
  PERMIT_FREE: '"Toestemmingsvrij"',
};

export enum ClientOutcomes {
  NEED_BOTH_PERMIT_AND_REPORT,
  NEED_CONTACT,
  NEED_PERMIT,
  NEED_REPORT,
  PERMIT_FREE,
}

export type AutofillData = {
  address?: any; // eslint-disable-line
};
export type Resolver = (
  autofillData: AutofillData,
  question: Question
) => Answer;
export type Answers = { [id: string]: Answer };
export type AutofillResolverMap = { [name: string]: Resolver };

/**
 * Step checker class for checker
 */
export default class Checker {
  readonly permits: Permit[];
  readonly stack: Question[] = [];
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
   * Returns a list of questionIds with the given answers.
   * Useful to store in Context or in sessionStorage
   *
   * @returns {({string: boolean|string|number|[string]})}  - a list of answers
   */
  getQuestionAnswers(): Answers {
    return this.stack
      .concat(this.getUpcomingQuestions()) // Merge the stack with upcoming questions to get all questions
      .filter((q) => q.answer !== undefined) // Remove all undefined questions
      .reduce((acc: Answers, question: Question) => {
        acc[question.id] = question.answer;
        return acc;
      }, {});
  }

  /**
   * Loops through all questions and answers these questions based on provided `answers`
   * Useful when you have stored the user answers and want to continue a particular session
   */
  setQuestionAnswers(answers: Answers): void {
    if (!isObject(answers)) {
      throw Error("Answers must be of type object");
    }

    // Skip when answers are empty (to prevent error with checkers without questions to render)
    if (Object.keys(answers).length === 0) {
      return;
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
      // or if the same question is handled again (to allow `Contact` outcomes)
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
   * Checks all rules in all permits to see if "contact" outcomes have been set
   *
   * @returns An Array of decisions with "contact" outcomes
   */
  _getContactOutcomeDecisions(): Decision[] {
    const decisions = [] as Decision[];

    this.permits.find((permit) => {
      const outcome = permit.getDecisionById("dummy") as Decision;
      const outcomeMatchingRules = outcome.getMatchingRules();
      const matchingContactRule = outcomeMatchingRules.find(
        (rule) => rule.outputValue === outcomes.NEED_CONTACT
      );
      if (matchingContactRule) {
        const decisiveDecisions = outcome.getDecisiveInputs() as Decision[];

        // find the contact decision
        const contactDecision = decisiveDecisions.find((decision) =>
          decision.rules.find(
            (rule) => rule.outputValue === outcomes.NEED_CONTACT
          )
        ) as Decision;

        decisions.push(contactDecision);
      }
    });

    return decisions;
  }

  /**
   * Find all "contact" outcomes, and check if the decisive decision's last question equals the currentQuestion.
   *
   * @param currentQuestion - the question to check for exit
   *
   * @returns Returns true if the `currentQuestion` triggers the 'contact' outcome
   */
  questionTriggersContactOutcome(currentQuestion: Question): boolean {
    const contactOutcomeDecision = this._getContactOutcomeDecisions();

    return !!contactOutcomeDecision.find(
      (decision) =>
        decision?.inputs[decision?.inputs.length - 1] === currentQuestion
    );
  }

  /**
   * Check if a question triggers the 'contact' outcome
   *
   * @returns Returns true if a question triggers the 'contact' outcome
   */
  hasContactOutcome(): boolean {
    return !!this.stack
      .concat(this.getUpcomingQuestions()) // Merge the stack with upcoming questions to get all questions
      .find((q) => this.questionTriggersContactOutcome(q));
  }

  /**
   * We consider a checker to be finished or conclusive when either:
   * - we have one or more permits with a contact-outcome
   * - all permits have outcomes and all questions are answered
   *
   * NB: this function has a bug when editing questions that trigger new questions.
   * Sometimes editing questions ('no' > 'yes' and then 'yes' > 'no') will trigger an unusual result in `getUpcomingQuestions()`.
   * There appear unanswered questions that are not relevant for the outcome.
   * There is a `hacky` fix: looping through all answered questions (both `stack` and `getUpcomingQuestions()`) and manually calling `checker.next()`
   * However, it is very hard to build a unit test for this and and also other tests will fail...
   * See Trello card: https://trello.com/c/XGavkNhC/958-bug-in-checker
   *
   * @returns Returns true if "at least one" of the condintions is met
   */
  isConclusive(): boolean {
    const hasUnfinishedPermits = !!this.permits.find(
      (permit) => !permit.getOutputByDecisionId("dummy")
    );

    const hasUnfinishedQuestions = !!this.stack
      .concat(this.getUpcomingQuestions())
      .find((q) => q.answer === undefined);

    return (
      this.hasContactOutcome() ||
      (!hasUnfinishedPermits && !hasUnfinishedQuestions)
    );
  }

  /**
   * Generate a list with decisive outcomes for questions on the stack.
   *
   * @returns Array of ClientOutcomes with the stack index as key: `[checker.stack.index]: ClientOutcome`
   */
  getOutcomesPerQuestion(): ClientOutcomes[] {
    const permitsPerQuestion: ClientOutcomes[] = [];

    this.permits.forEach((permit: Permit) => {
      const outcomeDecision = permit.getDecisionById("dummy");

      if (outcomeDecision) {
        const imtrOutcome = outcomeDecision.getOutput();

        // By default, the outcome is permit-free
        let outcomeType = ClientOutcomes.PERMIT_FREE;

        if (imtrOutcome === outcomes.NEED_CONTACT) {
          outcomeType = ClientOutcomes.NEED_CONTACT;
        } else if (imtrOutcome === outcomes.NEED_PERMIT) {
          outcomeType = ClientOutcomes.NEED_PERMIT;
        } else if (imtrOutcome === outcomes.NEED_REPORT) {
          outcomeType = ClientOutcomes.NEED_REPORT;
        }

        // Only return outcomes that are not permit-free
        if (outcomeType !== ClientOutcomes.PERMIT_FREE) {
          const decisiveDecisions = outcomeDecision.getDecisiveInputs() as Decision[];
          decisiveDecisions.forEach((decision) => {
            const decisiveQuestion = decision
              .getDecisiveInputs()
              .pop() as Question;
            const index = this.stack.indexOf(decisiveQuestion);
            if (!permitsPerQuestion[index]) {
              permitsPerQuestion[index] = outcomeType;
            }
          });
        }
      }
    });
    return permitsPerQuestion;
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
    return this.rewindTo(this.stack.length - (this.done ? 1 : 2));
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
   * Get all decisions for the outcome of every permit.
   */
  _getOutcomeDecisions(): Decision[] {
    return this.permits
      .map((permit) => permit.getDecisionById("dummy"))
      .flatMap((outcome) => (outcome as Decision).inputs) as Decision[];
  }

  /**
   * Get all questions for the permits in this checker
   */
  _getAllQuestions(): Question[] {
    // for every unanswsered decision in 'outcome' we push it's questions on
    // our accumulator, but only if it's not already on the stack
    return this.dedupeAndSortQuestions(
      this._getOutcomeDecisions().flatMap((decision) => decision.getQuestions())
    );
  }

  /**
   * Get unanswered questions that we need before the checker is final
   */
  getUpcomingQuestions(): Question[] {
    // take only questions/inputs into concideration that are autofilled or answered by the user
    const inputReducer: InputReducer = (input: Input) => {
      return this.stack.includes(input as Question) ||
        (input as Question).autofill
        ? input
        : null;
    };

    // for every unanswsered decision in 'outcome' we push it's questions on
    // our accumulator, but only if it's not already on the stack
    return this.dedupeAndSortQuestions(
      this._getOutcomeDecisions()
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
    return this.getUpcomingQuestions().shift();
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
      this.stack.push(question);
    } else {
      this.done = true;
    }
    return question || null;
  }

  /**
   *
   * Returns an Array of possible Outcome objects
   *
   */
  getOutcomesToDisplay(): Outcome[] {
    return this.permits
      .filter((permit: Permit) => !!permit.getOutputByDecisionId("dummy"))
      .map((permit: Permit) => {
        const conclusion = permit.getDecisionById("dummy") as Decision;
        const outcomeMatchingRules = conclusion.getMatchingRules() as Rule[];
        const contactOutcome = outcomeMatchingRules.find(
          (rule) => rule.outputValue === outcomes.NEED_CONTACT
        ) as Rule;
        const outcome = (contactOutcome?.outputValue ||
          outcomeMatchingRules[0].outputValue) as string;

        return {
          outcome,
          title:
            outcome === outcomes.NEED_CONTACT
              ? "Neem contact op met de gemeente"
              : `${permit.name.replace("Conclusie", "")}: ${removeQuotes(
                  outcome
                )}`,
          description:
            outcome === outcomes.NEED_CONTACT
              ? contactOutcome.description
              : outcomeMatchingRules[0].description,
        };
      });
  }

  /**
   *
   * Returns an outcome (as defined in `imtr.outcomes`) for each permit
   *
   */
  getAllOutcomeTypes(): string[] {
    const outcomes = this.getOutcomesToDisplay();
    return outcomes.map(({ outcome }) => outcome);
  }

  /**
   *
   * Returns the final outcome for the client (as defined in `ClientOutcomes`)
   *
   */
  getClientOutcomeType(): ClientOutcomes {
    const outcomeTypes = this.getAllOutcomeTypes();

    const needContactOutcome = outcomeTypes.find(
      (outcome) => outcome === outcomes.NEED_CONTACT
    );
    const needPermitOutcome = outcomeTypes.find(
      (outcome) => outcome === outcomes.NEED_PERMIT
    );
    const needReportOutcome = outcomeTypes.find(
      (outcome) => outcome === outcomes.NEED_REPORT
    );

    if (needContactOutcome) {
      // The contact outcome has most priority to display
      return ClientOutcomes.NEED_CONTACT;
    } else if (needPermitOutcome && needReportOutcome) {
      return ClientOutcomes.NEED_BOTH_PERMIT_AND_REPORT;
    } else if (needPermitOutcome) {
      return ClientOutcomes.NEED_PERMIT;
    } else if (needReportOutcome) {
      return ClientOutcomes.NEED_REPORT;
    } else {
      // The fallback outcome is permit-free, this is inherited from Flo Legal and IMTR
      return ClientOutcomes.PERMIT_FREE;
    }
  }
}
