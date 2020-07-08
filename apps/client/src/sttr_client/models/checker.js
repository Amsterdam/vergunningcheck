import { collectionOfType, isObject, uniqueFilter } from "../../utils";

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

    // Loop through `sttr-checker` and answer all questions provided by `answers`
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
   * XXX
   * @param {*} onlyMissing
   */
  getAutofillDataNeeds(autofillMap, onlyMissing = false) {
    // find one unfullfilled data need
    return this._getAllQuestions()
      .filter(({ autofill }) => !!autofill)
      .filter(({ answer }) => (onlyMissing ? answer === undefined : true))
      .map(({ autofill }) => autofillMap[autofill])
      .filter(uniqueFilter);
  }

  /**
   * XXX
   */
  dedupeAndSort(questions) {
    return questions.filter(uniqueFilter).sort((a, b) => a.prio - b.prio);
  }

  /**
   * XXX
   */
  _getConclusionDecisions() {
    return this.permits
      .map((permit) => permit.getDecisionById("dummy"))
      .flatMap((conclusion) => conclusion._inputs);
  }

  /**
   * XXX
   */
  _getAllQuestions() {
    // for every unanswsered decision in 'conclusion' we push it's questions on
    // our accumulator, but only if it's not already on the stack
    return this.dedupeAndSort(
      this._getConclusionDecisions().flatMap((decision) =>
        decision.getQuestions()
      )
    );
  }

  /**
   * XXX
   */
  _getUpcomingQuestions() {
    // take only questions/inputs into concideration that are autofilled or answered by the user
    const inputReducer = (input) => {
      return this.stack.includes(input) || input.autofill ? input : {};
    };

    // for every unanswsered decision in 'conclusion' we push it's questions on
    // our accumulator, but only if it's not already on the stack
    return this.dedupeAndSort(
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
    // return this._questions.find(question => !this.stack.includes(question));
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
