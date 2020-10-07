import { collectionOfType, isObject, uniqueFilter } from "../../utils";

export const imtrOutcomes = {
  NEED_PERMIT: '"Vergunningplicht"',
  NEED_CONTACT: '"NeemContactOpMet"',
  PERMIT_FREE: '"Toestemmingsvrij"',
};

/**
 * Step checker class for quiz
 *
 * @typedef {import('./question')} Question
 * @typedef {import('./decision')} Decision
 * @typedef {import('./permit')} Permit
 * @property {Permit[]} _permits - an internally used list of decisions
 * @property {Question[]} _stack - a list of questions
 */
class Checker {
  /**
   * Constructor for Checker
   *
   * @param {Permit[]} permits - Decisions for this quiz
   */
  constructor(permits) {
    if (!collectionOfType(permits, "Permit")) {
      throw Error("'permits' must be an array of type 'Permit'");
    }

    // Store permits by number of questions
    this._permits = permits.sort(
      (firstEl, secondEl) =>
        firstEl.questions.length < secondEl.questions.length
    );

    /**
     * @type {Question[]}
     */
    this._stack = [];

    this._autofilled = false;
  }

  /**
   * @returns {Permit[]} - a list of permits for this checker
   */
  get permits() {
    return this._permits;
  }

  /**
   * @returns {Question[]} - a list of questions in the stack
   */
  get stack() {
    return this._stack;
  }

  /**
   * Returns a list of questionIds with the given answers.
   * Useful to store in React.Context or in sessionStorage
   *
   * @returns {({string: boolean|string|number|[string]})}  - a list of answers
   */
  getQuestionAnswers() {
    return this.stack
      .concat(this._getUpcomingQuestions()) // Merge the stack with upcoming questions to get all questions
      .reduce((acc, question) => {
        acc[question.id] = question.answer;
        return acc;
      }, {});
  }

  /**
   * Loops through all questions and answers these questions based on provided `answers`
   * Useful when you have stored the user answers and want to continue a particular session
   */
  setQuestionAnswers(answers) {
    if (!isObject(answers)) {
      throw Error("Answers must be of type object");
    }

    // Load the first question
    if (!this._last) {
      this.next();
    }

    let done = false;
    let prevId = null;

    // Loop through `imtr-checker` and answer all questions provided by `answers`
    while (done === false) {
      const questionAnswer = answers[this._last.id];

      // The checker is completed when `questionAnswer` is undefined
      // or if the same question is handled again (to allow `Contact` conclusions)
      if (questionAnswer === undefined || prevId === this._last.id) {
        done = true;
      } else {
        // Answer the question and proceed
        prevId = this._last.id;
        this._last.setAnswer(questionAnswer);
        this.next();
      }
    }
  }

  /**
   * @returns {Question} - last question in the stack
   */
  get _last() {
    return this.stack[this.stack.length - 1];
  }

  /**
   * Find all permits that have a "contact" conclusion,
   * for every permit see if the decisive decision's last question
   * equals the currentQuestion.
   *
   * @param {Question} currentQuestion - the question to check for exit
   *
   * @returns {boolean} - if checker has a 'contact' outcome
   * consumer can exit if wanted
   */
  needContactExit(currentQuestion) {
    return !!this.permits.find((permit) => {
      const conclusion = permit.getDecisionById("dummy");
      const conclusionMatchingRules = conclusion.getMatchingRules();
      const matchingContactRule = conclusionMatchingRules.find(
        (rule) => rule.outputValue === imtrOutcomes.NEED_CONTACT
      );
      if (matchingContactRule) {
        const decisiveDecisions = conclusion.getDecisiveInputs();

        // find the contact decision
        const contactDecision = decisiveDecisions.find((decision) =>
          decision._rules.find(
            (rule) => rule._outputValue === imtrOutcomes.NEED_CONTACT
          )
        );

        // get inputs from contact decision
        const lastIndex = contactDecision._inputs.length - 1;
        // if currentQuestion equals the last input in decision, it's a match
        return contactDecision._inputs[lastIndex] === currentQuestion;
      }
      return false;
    });
  }

  /**
   * We consider a checker to be finished or conclusive when either we
   * have one or more permits with a contact-outcome, or all permits
   * have a conclusion.
   *
   * @returns {boolean} - Returns true if "at least one" of the permits inside checker has a final outcome
   *
   */
  isConclusive() {
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
   * @param {object} resolvers - A map of {[name]: resolver(autofillData)}
   * @param {object} autofillData - the autofill data that will be send to the resolver
   **/
  autofill(resolvers, autofillData) {
    if (JSON.stringify(autofillData) !== this._autofillData) {
      this._getAllQuestions().forEach((question) => {
        const resolver = resolvers[question.autofill];
        const answer = resolver ? resolver(autofillData) : undefined;
        if (answer !== undefined) {
          question.setAnswer(answer);
        }
      });
      this._autofillData = JSON.stringify(autofillData);
    }
  }

  /**
   * Rewind to a question in the stack
   *
   * @param {number} index - The index in the stack to rewind to
   * @returns {Question} The last question in the stack
   */
  rewindTo(index) {
    const lastIndex = this._stack.length - 1;
    if (index < 0) {
      throw Error("'rewindTo' index cannot be less then 0");
    }
    if (index > lastIndex) {
      throw Error(
        `'rewindTo' index (${index}) cannot be bigger then the last index (${lastIndex})`
      );
    }
    this._stack.splice(index + 1);
    this._done = false;
    return this._last;
  }

  /**
   * Rewind to the previous question. If the checker is done/finished
   * we rewind to the latest in the stack.
   *
   * @returns {Question} The previous question
   */
  previous() {
    return this.rewindTo(this._stack.length - (this._done === true ? 1 : 2));
  }

  /**
   * Find all data needs
   *
   * @param {object} autofillMap - the resolver map to determine if we can autofill
   * @param {boolean} onlyMissing - return all or only missing dataneeds
   */
  getAutofillDataNeeds(autofillMap, onlyMissing = false) {
    return this._getAllQuestions()
      .filter(({ autofill }) => !!autofill)
      .filter(({ answer }) => (onlyMissing ? answer === undefined : true))
      .map(({ autofill }) => autofillMap[autofill])
      .filter(uniqueFilter);
  }

  /**
   * Util function to deduplicate a question list, sort it by prio
   *
   * @param {Question[]} questions - the list of questions
   */
  dedupeAndSortQuestions(questions) {
    return questions.filter(uniqueFilter).sort((a, b) => a.prio - b.prio);
  }

  /**
   * Get all decisions for the conclusion of every permit.
   */
  _getConclusionDecisions() {
    return this.permits
      .map((permit) => permit.getDecisionById("dummy"))
      .flatMap((conclusion) => conclusion._inputs);
  }

  /**
   * Get all questions for the permits in this checker
   */
  _getAllQuestions() {
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
  _getUpcomingQuestions() {
    // take only questions/inputs into concideration that are autofilled or answered by the user
    const inputReducer = (input) => {
      return this.stack.includes(input) || input.autofill ? input : {};
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
   * @returns {Question|null} - the next question for this checker
   */
  _getNextQuestion() {
    return this._getUpcomingQuestions().shift();
  }

  /**
   * Get the next question for this checker
   *
   * @returns {!(Question|null)} The next question or null if done
   */
  next() {
    if (this._last !== undefined && this._last.answer === undefined) {
      throw Error(`Please answer the question first ${this._last}`);
    }
    const question = this._getNextQuestion();
    if (question) {
      this._stack.push(question);
    } else {
      this._done = true;
    }
    return question || null;
  }
}

export default Checker;
