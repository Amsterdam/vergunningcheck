import { getAutofillResolverKey } from "./autofill.ts";

import {
  CONTENT_OUTCOME_EXPLANATION,
  CONTENT_EXECUTION_RULE_EXPLANATION,
  CONTENT_EXPLANATION,
  CONTENT_LONG_EXPLANATION,
  DMN_DECISION_TABLE,
  DMN_DECISION,
  DMN_DEFINITIONS,
  DMN_EXTENSION_ELEMENTS,
  DMN_INFORMATION_REQUIREMENT,
  DMN_INPUT_DATA,
  DMN_INPUT_ENTRY,
  DMN_OUTPUT_ENTRY,
  DMN_REQUIRED_DECISION,
  DMN_REQUIRED_INPUT,
  DMN_RULE,
  DMN_TEXT,
  DMN_VARIABLE,
  feelTypes,
  INTER_PRIORITY,
  UITV_DATA_TYPE,
  UITV_EXECUTION_RULE_REF,
  UITV_EXECUTION_RULE,
  UITV_EXECUTION_RULES,
  UITV_GEO_REF,
  UITV_LOCATION,
  UITV_LOCATION_IDENTIFICATION,
  UITV_OPTION_TEXT,
  UITV_OPTION_TYPE,
  UITV_OPTION,
  UITV_OPTIONS,
  UITV_QUESTION_TEXT,
  UITV_QUESTION,
  UITV_REUSABLE_ID,
} from "./types/imtr";

import type {
  DMNDecision,
  DMNDefinition,
  DMNDocument,
  DMNExtensionElement,
  DMNInformationRequirement,
  DMNInputData,
  DMNInputEntry,
  IMTROption,
  RequiredInputOrDecision,
} from "./types/imtr";

import type {
  JSONDecisions,
  JSONInputs,
  JSONPermit,
  JSONQuestion,
  JSONRule,
  JSONRuleInput,
} from "./types/json";

import { format, strFmt } from "./util";

type ParserQuestion = JSONQuestion & {
  _id: string;
};

/**
 * Main function to get configuration for imtr-client.
 * Output can be used to store as a json-file
 */
export default (json: DMNDocument): JSONPermit => {
  const definition = json[DMN_DEFINITIONS][0] as DMNDefinition;
  const questions = getQuestions(definition[DMN_EXTENSION_ELEMENTS]);
  const decisions = getDecisions(definition[DMN_DECISION]) as JSONDecisions;
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

/**
 * Get decisions configuration
 */
const getDecisions = (dmnDecisions: DMNDecision[]) => {
  return dmnDecisions.reduce((jsonDecisions: JSONDecisions, decision) => {
    // Get the information-requirement (input or decision) href-reference
    // requiredInput or requiredDecision
    const baseDecision = decision[DMN_INFORMATION_REQUIREMENT].reduce(
      (acc: any, informationRequirement: DMNInformationRequirement) => {
        const key = Object.keys(informationRequirement)[0]; // get the tagName
        const ir = informationRequirement[
          key === DMN_REQUIRED_INPUT
            ? DMN_REQUIRED_INPUT
            : DMN_REQUIRED_DECISION
          ] as RequiredInputOrDecision[];
        const href = ir[0].attributes.href;

        const shortKey = `${key.split(":")[1]}s`;
        acc[shortKey] = (acc[shortKey] || []).concat(href);
        return acc;
      },
      {}
    );

    const table = decision[DMN_DECISION_TABLE][0];
    const rules = table[DMN_RULE].reduce((rules: JSONRule[], rule) => {
      const outputEntry = rule[DMN_OUTPUT_ENTRY][0];
      const extensionElements = outputEntry[DMN_EXTENSION_ELEMENTS];
      const outcomeDescription =
        extensionElements?.[0][CONTENT_OUTCOME_EXPLANATION];
      const description = outcomeDescription?.[0][CONTENT_EXPLANATION];

      const jsonRule: JSONRule = {
        inputs: rule[DMN_INPUT_ENTRY].reduce(
          (inputEntries: JSONRuleInput[], inputEntry: DMNInputEntry) => {
            const text = inputEntry[DMN_TEXT];
            const value =
              text === "true" ? true : text === "false" ? false : text;
            inputEntries.push(value);
            return inputEntries;
          },
          []
        ),
        output:
          typeof outputEntry[DMN_TEXT] === "string"
            ? strFmt(outputEntry[DMN_TEXT])
            : outputEntry[DMN_TEXT],
      };

      if (description) jsonRule.description = description;

      rules.push(jsonRule);
      return rules;
    }, []);

    console.log();
    jsonDecisions[decision.attributes.id.startsWith("_") ? "dummy" : decision.attributes.id] = {
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
const getInputs = (dmnInputDataCollection: DMNInputData[]) => {
  return dmnInputDataCollection.reduce((acc: JSONInputs, dmnInputData) => {
    const { href } = dmnInputData[DMN_EXTENSION_ELEMENTS][0][
      UITV_EXECUTION_RULE_REF
      ][0].attributes;
    const { typeRef } = dmnInputData[DMN_VARIABLE][0].attributes;

    acc[dmnInputData.attributes.id.startsWith("_") ? "dummy" : dmnInputData.attributes.id] = {
      href,
      type: feelTypes[typeRef],
    };
    return acc;
  }, {});
};

/**
 * Get questions configuration
 */
const getQuestions = (
  xmlExtensionElements: DMNExtensionElement[]
): ParserQuestion[] => {
  const extElement = xmlExtensionElements[0] as DMNExtensionElement;
  const rulesCollection = extElement[UITV_EXECUTION_RULES];
  const rules = rulesCollection[0][UITV_EXECUTION_RULE];

  return rules.map((rule) => {
    let result: any;

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
      const desc = rule[CONTENT_EXECUTION_RULE_EXPLANATION]?.[0];

      result = {
        text: strFmt(question[UITV_QUESTION_TEXT]),
      };

      const longDescription = format(desc?.[CONTENT_LONG_EXPLANATION]);
      if (longDescription) result.longDescription = longDescription;
      const description = format(desc?.[CONTENT_EXPLANATION]);
      if (description) result.description = description;
      const autofill = getAutofillResolverKey(result.text);
      if (autofill) result.autofill = autofill;

      if (imtrType === "list") {
        const options = question[UITV_OPTIONS]?.[0];
        if (options?.[UITV_OPTION_TYPE] !== "enkelAntwoord") {
          result.collection = true;
        }
        const optionList = options?.[UITV_OPTION];
        result.options = optionList?.map((option: IMTROption) =>
          strFmt(option[UITV_OPTION_TEXT])
        );
      }

      // because of current imtr 'list'-implementation we only accept lists of strings
      result.type = imtrType === "list" ? "string" : imtrType;
    }

    // Set original id, we'll fix that in transform
    result.id = rule.attributes.id

    // Just pass prio from rule-definition here, we'll fix the prio when merging the permits together
    result.prio = rule[INTER_PRIORITY];

    // Questions can be deduplicated with uuid
    if (rule[UITV_REUSABLE_ID]) result.uuid = rule[UITV_REUSABLE_ID];

    const x: ParserQuestion = result;
    return x;
  });
};
