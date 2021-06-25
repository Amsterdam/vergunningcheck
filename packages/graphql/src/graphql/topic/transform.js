const { createHash } = require("crypto");
const imtrbuild = require("./parser");
const debug = require("debug")("graphql:loader:flolegal:transform");
/**
 * Consistent hashing for id's
 */
const getId = (input) => {
  const hash = createHash("sha256");
  hash.update(JSON.stringify(input));
  return hash.digest("hex");
};

module.exports = (permits) => {
  /**
   * Preprocessors are used to change the parsed imtr file.
   * The output of every preprocessor is passed as input to the next,
   * so keep in mind the order of this array.
   */
  const postprocessors = [
    /**
     * We actually don't need the `inputs` from DMN, we link question
     * to decisions directly.
     *
     * @param imtr - The parsed imtr
     */
    ({ inputs, ...imtr }) => imtr,

    /**
     * Give questions a higher priority-number (so _less_ important) matching
     * the weight with the number of questions per permit
     *
     * One implementation could be like this:
     *   `result.prio = permit.questions.length * 10000 + question.prio`
     * Another solution would be using the order of permit-id's in our config.
     * See implementation below.
     *
     * @param imtr - The parsed imtr
     * @param options - Options object, at least containing the `permitIndex`
     */
    ({ questions, ...imtr }, { permitIndex }) => ({
      ...imtr,
      questions: questions.map((question) => ({
        ...question,
        prio: question.prio + permitIndex * 10000,
      })),
    }),

    /**
     * We override the imtr id's for questions and decisions. We don't
     * want to rely on external parties id's at runtime. This also prevents
     * many git-conflicts because of changing id's when actually nothing
     * changed in the imtr files.
     *
     * We create id's based on the contents of the question and decision
     * by hashing all property-values.
     *
     * @param imtr - The parsed imtr
     */
    (imtr) => {
      // Fix the id's for questions (uitv_[uuid])
      let questionsIdMap = {};
      const questions = imtr.questions.reduce((acc, question) => {
        const { id: originalId, ...rest } = question;

        // Assign id with rest-spread to the question
        const id = getId(rest);
        acc.push({
          ...rest,
          id,
        });

        // Build map for inputs
        questionsIdMap[originalId] = id;
        return acc;
      }, []);

      // Fix the id's for requiredInputs in decisions (_[uuid]).
      let decisionsIdMap = {};
      const decisionsWithInputs = Object.entries(imtr.decisions)
        .filter(([_, { requiredInputs }]) => !!requiredInputs)
        .reduce((acc, [originalId, decision]) => {
          // Fix the reference to the inputs
          decision.requiredInputs = decision.requiredInputs.map(
            (inputId) => questionsIdMap[inputId.replace("#input_", "uitv_")]
          );

          // Fix the id's for decision
          const id = getId(decision);
          acc[id] = decision;

          // Build decisionIdMap for decisions
          decisionsIdMap[originalId] = id;
          return acc;
        }, {});

      // Fix the id's for requiredDecisions in decisions (eg. dummy).
      const decisionsWithDecisions = Object.entries(imtr.decisions)
        .filter(([_, { requiredDecisions }]) => !!requiredDecisions)
        .reduce((acc, [id, decision]) => {
          // Fix the reference to the inputs
          decision.requiredDecisions = decision.requiredDecisions.map(
            (originalId) => decisionsIdMap[originalId.replace("#", "")]
          );

          acc[id] = decision;
          return acc;
        }, {});

      return {
        name: imtr.name,
        questions,
        decisions: {
          ...decisionsWithInputs,
          ...decisionsWithDecisions,
        },
      };
    },
  ];

  return permits.map(async (json, permitIndex) => {
    // apply all reducers to imtr
    try {
      const baseImtr = await imtrbuild(json);

      // Run preprocessors on raw json string
      const options = {
        permitIndex,
      };
      const imtr = postprocessors.reduce(
        (acc, reducer) => reducer(acc, options),
        baseImtr
      );

      const res = {
        ...imtr,
      };
      debug("res", res);
      return res;
    } catch (e) {
      console.error(`failed to convert json`, json);
      throw e;
    }
  });
};
