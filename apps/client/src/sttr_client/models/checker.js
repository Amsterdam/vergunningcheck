import { collectionOfType, uniqueFilter } from "../util";

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

    this._questions = this._permits
      .flatMap((permit) => permit.questions) // getOpenInputs would be faster for the user
      .filter(uniqueFilter);

    /**
     * @type {Question[]}
     */
    this._stack = [];
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
   * @returns {Question} - last question in the stack
   */
  get _last() {
    return this.stack[this.stack.length - 1];
  }

  _getUpcomingQuestions() {
    // todo: filter duplicate questions
    // todo: optimization would be to return only first value
    return this.permits
      .reduce((acc, permit) => {
        const conclusion = permit.getDecisionById("dummy");
        const inputReducer = (input) =>
          this.stack.includes(input) ? input : {};
        conclusion._inputs
          .filter((d) => d.getMatchingRules(inputReducer).length === 0)
          .forEach((decision) => {
            decision.getQuestions().forEach((input) => {
              if (this.stack.indexOf(input) === -1) {
                acc.push(input);
              }
            });
          });
        return acc;
      }, [])
      .filter(uniqueFilter)
      .sort((a, b) => a.prio - b.prio);
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
   * Rewind to a question in the stack
   *
   * @param {number} index - The index in the stack to rewind to
   * @returns {Question} The last question in the stack
   */
  rewindTo(index) {
    const lastIndex = this._stack.length - 1;
    if (index < 0 || index > lastIndex) {
      throw Error("'rewindTo' index out of bounds of current question stack.");
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
   * Get the next question for this checker
   *
   * @returns {!(Question|null)} The next question or null if done
   */
  next() {
    if (this._last !== undefined && this._last.answer === undefined) {
      throw Error("Please answer the question first");
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
