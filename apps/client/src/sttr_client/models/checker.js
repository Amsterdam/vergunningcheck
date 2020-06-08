import { collectionOfType, uniqueFilter } from "../../utils";

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
    return this._getUserQuestions().filter(
      (question) => !this.stack.includes(question)
    );
  }

  _getUserQuestions() {
    return this._getQuestions().filter((q) => !q.autofill);
  }

  _getQuestions() {
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
        `'rewindTo' index cannot be bigger then it's length (${lastIndex})`
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
  getDataNeeds(onlyMissing = false) {
    const autofillMap = {
      monument: "address",
      cityScape: "address",
      // geo: 'map', // for trees ?
    };

    // find one unfullfilled data need
    return this._getQuestions()
      .filter(({ autofill }) => !!autofill)
      .filter(({ answer }) => (onlyMissing ? answer === undefined : true))
      .map(({ autofill }) => autofillMap[autofill])
      .filter(uniqueFilter);
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

  // getPreviousUserQuestion() {
  //   if (!AUTOFILL_ENABLED) {
  //     return this.checker.next();
  //   }

  //   let next;
  //   let done = false;
  //   while (!done) {
  //     next = this.checker.next();
  //     // if there is no next question we're done
  //     // if we do have a next question we're only done if it's not an autofill question
  //     if (!next || (next && !next.autofill)) {
  //       done = true;
  //     }
  //   }
  //   return next;
  // }

  // getNextUserQuestion() {
  //   let prev;
  //   let done = false;
  //   while (!done) {
  //     if (this.checker.stack.length === 1) {
  //       done = true;
  //     } else {
  //       prev = this.checker.previous();

  //       // if autifill is disabled we're done
  //       // if autofill is enabled and we don't have a prev, we're done
  //       // if autofill is enabled, we DO have a prev but it's NOT autofilled, we're done
  //       if (AUTOFILL_ENABLED === false || !prev || !prev.autofill) {
  //         done = true;
  //       }
  //     }
  //   }
  //   return prev;
  // }
}

export default Checker;
