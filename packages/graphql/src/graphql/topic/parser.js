// XML fields for executable-rules (uitv-spec) from IMTR
const UITV_DATA_TYPE = "uitv:gegevensType";
const UITV_EXECUTION_RULE = "uitv:uitvoeringsregel";
const UITV_EXECUTION_RULE_REF = "uitv:uitvoeringsregelRef";
const UITV_EXECUTION_RULES = "uitv:uitvoeringsregels";
const UITV_GEO_REF = "uitv:geoVerwijzing";
const UITV_LOCATION = "uitv:locatie";
const UITV_LOCATION_IDENTIFICATION = "identificatie";
const UITV_OPTION = "uitv:optie";
const UITV_OPTION_TEXT = "uitv:optieText";
const UITV_OPTION_TYPE = "uitv:optieType";
const UITV_OPTIONS = "uitv:opties";
const UITV_QUESTION = "uitv:vraag";
const UITV_QUESTION_TEXT = "uitv:vraagTekst";
const UITV_REUSABLE_ID = "uitv:herbruikbaarId";

// XML fields for interaction-rules (inter-spec) from IMTR
const INTER_PRIORITY = "inter:prioriteit";

// XML fields for content-spec from IMTR
const CONTENT_OUTCOME_EXPLANATION = "content:conclusieToelichting";
const CONTENT_EXECUTION_RULE_EXPLANATION =
  "content:uitvoeringsregelToelichting";
const CONTENT_EXPLANATION = "content:toelichting";
const CONTENT_LONG_EXPLANATION = "content:langeToelichting";

// XML fields for dmn-spec
// https://www.omg.org/spec/DMN/About-DMN/
const DMN_DECISION = "dmn:decision";
const DMN_DECISION_TABLE = "dmn:decisionTable";
const DMN_DEFINITIONS = "dmn:definitions";
const DMN_EXTENSION_ELEMENTS = "dmn:extensionElements";
const DMN_INFORMATION_REQUIREMENT = "dmn:informationRequirement";
const DMN_INPUT_DATA = "dmn:inputData";
const DMN_INPUT_ENTRY = "dmn:inputEntry";
const DMN_OUTPUT_ENTRY = "dmn:outputEntry";
const DMN_REQUIRED_DECISION = "dmn:requiredDecision";
const DMN_REQUIRED_INPUT = "dmn:requiredInput";
const DMN_RULE = "dmn:rule";
const DMN_TEXT = "dmn:text";
const DMN_VARIABLE = "dmn:variable";

// Map field-types from 'feel'-spec to our representation.
const feelTypes = {
  "feel:boolean": "boolean",
  "feel:string": "string",
};

const strFmt = (str) => str.trim();
const format = (el) => (typeof el === "string" ? strFmt(el) : el);

/**
 * The key is the name/key for the autofill-resolver
 * The value is a list of strings to look for in the question text
 */
const autoFillMap = [
  {
    resolverKey: "cityScapeForBuilding",
    questionMatchers: [
      "ligt het gebouw waarop u de zonnepanelen gaat plaatsen in een beschermd stads- of dorpsgezicht",
      "ligt het gebouw waarop u de zonneboiler gaat plaatsen in een beschermd stads- of dorpsgezicht",
      "ligt het gebouw in een beschermd stads- of dorpsgezicht",
    ],
  },
  {
    resolverKey: "cityScapeWithoutEntity",
    questionMatchers: [
      "ligt het adres waar u wilt slopen in een beschermd stads-",
    ],
  },
  /*
   * The word 'monument' is used in both the boolean and list version of the
   * monument question
   **/
  {
    resolverKey: "monumentBoolean",
    questionMatchers: ["gemeentelijk of rijksmonument"],
  },
  {
    resolverKey: "monumentList",
    questionMatchers: ["gebouw een monument"],
  },
  {
    resolverKey: "monumentOnAddress",
    questionMatchers: ["staat er een monument op het adres"],
  },
];

/**
 * This function uses herbruikbaarId (dutch for 'reusableId') to get the key
 * of the autofill resolver. Its basically a substring check
 *
 * Example:
 *  getAutofill("MONUMENT-dakkapel") returns "monument"
 */
const getAutofillResolverKey = (questionText) => {
  const normalizedIdentifier = questionText.toLowerCase();
  const firstAutofillEntry = autoFillMap.find(({ questionMatchers }) => {
    return questionMatchers.find((matcher) => {
      return normalizedIdentifier.indexOf(matcher) > -1;
    });
  });
  // from the {key, strings[]} return the 'key' for the autofill-resolver
  return firstAutofillEntry ? firstAutofillEntry.resolverKey : undefined;
};

/**
 * Get decisions configuration
 */
const getDecisions = (dmnDecisions) => {
  return dmnDecisions.reduce((jsonDecisions, decision) => {
    // Get the information-requirement (input or decision) href-reference
    // requiredInput or requiredDecision
    const baseDecision = decision[DMN_INFORMATION_REQUIREMENT].reduce(
      (acc, informationRequirement) => {
        const key = Object.keys(informationRequirement)[0]; // get the tagName
        const ir =
          informationRequirement[
            key === DMN_REQUIRED_INPUT
              ? DMN_REQUIRED_INPUT
              : DMN_REQUIRED_DECISION
          ];
        const { href } = ir[0].attributes;

        const shortKey = `${key.split(":")[1]}s`;
        acc[shortKey] = (acc[shortKey] || []).concat(href);
        return acc;
      },
      {}
    );

    const table = decision[DMN_DECISION_TABLE][0];
    const rules = table[DMN_RULE].reduce((ruleSet, rule) => {
      const outputEntry = rule[DMN_OUTPUT_ENTRY][0];
      const extensionElements = outputEntry[DMN_EXTENSION_ELEMENTS];

      const outcomeDescription = extensionElements
        ? extensionElements[0][CONTENT_OUTCOME_EXPLANATION]
        : undefined;

      const description = outcomeDescription
        ? outcomeDescription[0][CONTENT_EXPLANATION]
        : undefined;

      const jsonRule = {
        inputs: rule[DMN_INPUT_ENTRY].reduce((inputEntries, inputEntry) => {
          const text = inputEntry[DMN_TEXT];
          const value =
            text === "true" ? true : text === "false" ? false : text;
          inputEntries.push(value);
          return inputEntries;
        }, []),
        output:
          typeof outputEntry[DMN_TEXT] === "string"
            ? strFmt(outputEntry[DMN_TEXT])
            : outputEntry[DMN_TEXT],
      };

      if (description) jsonRule.description = description;

      ruleSet.push(jsonRule);
      return ruleSet;
    }, []);

    jsonDecisions[
      Object.keys(baseDecision)[0] === "requiredDecisions"
        ? "dummy"
        : decision.attributes.id
    ] = {
      ...baseDecision,
      decisionTable: {
        rules,
      },
    };
    return jsonDecisions;
  }, {});
};

/**
 * Get input configuration
 */
const getInputs = (dmnInputDataCollection) => {
  return dmnInputDataCollection.reduce((acc, dmnInputData) => {
    const { href } = dmnInputData[DMN_EXTENSION_ELEMENTS][0][
      UITV_EXECUTION_RULE_REF
    ][0].attributes;
    const { typeRef } = dmnInputData[DMN_VARIABLE][0].attributes;

    acc[dmnInputData.attributes.id] = {
      href,
      type: feelTypes[typeRef],
    };
    return acc;
  }, {});
};

/**
 * Get questions configuration
 */
const getQuestions = (xmlExtensionElements) => {
  const extElement = xmlExtensionElements[0];
  const rulesCollection = extElement[UITV_EXECUTION_RULES];
  const rules = rulesCollection[0][UITV_EXECUTION_RULE];

  return rules.map((rule) => {
    let result;

    const geoReference = rule[UITV_GEO_REF];
    if (geoReference) {
      const text = geoReference[0][UITV_QUESTION_TEXT];
      result = {
        identification:
          geoReference[0][UITV_LOCATION][0].attributes[
            UITV_LOCATION_IDENTIFICATION
          ],
        type: "geo",
      };
      if (text) {
        result.text = text;
      }
    } else {
      // list or boolean
      const question = rule[UITV_QUESTION][0];
      const dataType = question[UITV_DATA_TYPE];
      const imtrType = dataType;
      const desc = rule[CONTENT_EXECUTION_RULE_EXPLANATION]
        ? rule[CONTENT_EXECUTION_RULE_EXPLANATION][0]
        : undefined;

      result = {
        text: strFmt(question[UITV_QUESTION_TEXT]),
      };

      const longDescription = format(
        desc ? desc[CONTENT_LONG_EXPLANATION] : undefined
      );
      if (longDescription) result.longDescription = longDescription;
      const description = format(desc ? desc[CONTENT_EXPLANATION] : undefined);
      if (description) result.description = description;
      const autofill = getAutofillResolverKey(result.text);
      if (autofill) result.autofill = autofill;

      if (imtrType === "list") {
        const options = question[UITV_OPTIONS]
          ? question[UITV_OPTIONS][0]
          : undefined;
        if (options && options[UITV_OPTION_TYPE] !== "enkelAntwoord") {
          result.collection = true;
        }
        const optionList = options ? options[UITV_OPTION] : undefined;
        result.options = optionList
          ? optionList.map((option) => strFmt(option[UITV_OPTION_TEXT]))
          : undefined;
      }

      // because of current imtr 'list'-implementation we only accept lists of strings
      result.type = imtrType === "list" ? "string" : imtrType;
    }

    // Set original id, we'll fix that in transform
    result.id = rule.attributes.id;

    // Just pass prio from rule-definition here, we'll fix the prio when merging the permits together
    result.prio = rule[INTER_PRIORITY];

    // Questions can be deduplicated with uuid
    if (rule[UITV_REUSABLE_ID]) result.uuid = rule[UITV_REUSABLE_ID];

    const x = result;
    return x;
  });
};

/**
 * Main function to get configuration for imtr-client.
 * Output can be used to store as a json-file
 */
module.exports = (json) => {
  const definition = json[DMN_DEFINITIONS][0];
  const questions = getQuestions(definition[DMN_EXTENSION_ELEMENTS]);
  const decisions = getDecisions(definition[DMN_DECISION]);
  const inputs = getInputs(definition[DMN_INPUT_DATA]);

  return {
    /** Please don't sort these keys, it determines the json output. Most informative fields
     * are shown first.
     */
    name: definition.attributes.name,
    questions,
    decisions,
    inputs,
  };
};
