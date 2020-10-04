import { getAutofillResolverKey } from './autofill.ts';

import { UITV_LOCATION, DMN_REQUIRED_INPUT, DMN_REQUIRED_DECISION, DMNInformationRequirement, RequiredInputOrDecision, DMN_DEFINITIONS, DMNExtensionElement, IMTROption, DMNDecision, DMNDocument, feelTypes, DMNDefinition, DMNInputData, IMTRExecutionRule, DMNInputEntry, DMN_DECISION, DMN_INPUT_DATA, DMN_EXTENSION_ELEMENTS, DMN_INFORMATION_REQUIREMENT, DMN_DECISION_TABLE, DMN_RULE, DMN_OUTPUT_ENTRY, DMN_TEXT, DMN_INPUT_ENTRY, DMN_VARIABLE, UITV_DATA_TYPE, UITV_EXECUTION_RULE, UITV_EXECUTION_RULES, UITV_EXECUTION_RULE_REF, UITV_GEO_REF, UITV_OPTION, UITV_OPTIONS, UITV_OPTION_TEXT, UITV_OPTION_TYPE, UITV_QUESTION, UITV_QUESTION_TEXT, UITV_REUSABLE_ID, CONTENT_CONCLUSION_EXPLANATION, CONTENT_EXECUTION_RULE_EXPLANATION, CONTENT_EXPLANATION, CONTENT_LONG_EXPLANATION, INTER_PRIORITY }
  from './types/imtr.ts';

import { JSONRule, JSONDecisions, JSONInputs, JSONPermit, JSONQuestion, JSONRuleInput }
  from './types/json.ts';

/**
 * How this works:
 *
 * imtr xml -> imtr - JSON(transform.ts)
 * imtr - JSON -> dakkapel - plaatsen.json
 * IMTRClient.getChecker(dakkapel - plaatsen.json)
 * IMTRClient(clientConfig) -> js - objecten
 * new Question(dakkapel - plaatsen.question[0])
 */

/**
* TODO: todo implement consistent hashing for id's:
* ```
* import { createHash } from "https://deno.land/std/hash/mod.ts";
* const getId = ({ "@_id": _, ...rest }) => {
*   const hash = createHash("md5");
*   hash.update(JSON.stringify(rest));
*   return hash.toString();
* };
* ```
*/

/**
 * Main function to get configuration for imtr-client.
 * Output can be used to store as a json-file
 */
export default (json: DMNDocument): JSONPermit => {
  const definition = json[DMN_DEFINITIONS][0] as DMNDefinition;
  return {
    decisions: getDecisions(definition[DMN_DECISION]) as JSONDecisions,
    inputs: getInputs(definition[DMN_INPUT_DATA]),
    name: definition.attributes.name,
    questions: getQuestions(definition[DMN_EXTENSION_ELEMENTS]),
  };
}

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
        const ir = informationRequirement[key === DMN_REQUIRED_INPUT ? DMN_REQUIRED_INPUT : DMN_REQUIRED_DECISION] as RequiredInputOrDecision[];
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

      const conclusionDescription = extensionElements?.[0][CONTENT_CONCLUSION_EXPLANATION];
      const description = conclusionDescription?.[0][CONTENT_EXPLANATION];

      const output = outputEntry[DMN_TEXT];
      rules.push({
        description,
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
        output: output,
      });
      return rules;
    }, []);


    jsonDecisions[decision.attributes.id] = {
      ...baseDecision, decisionTable: {
        rules,
      }
    };
    return jsonDecisions;
  }, {});
}

/**
 * Get input configuration
 */
const getInputs = (dmnInputDataCollection: DMNInputData[]) => {
  return dmnInputDataCollection.reduce((acc: JSONInputs, dmnInputData) => {
    const { id } = dmnInputData.attributes;
    const { href } = dmnInputData[DMN_EXTENSION_ELEMENTS][0][UITV_EXECUTION_RULE_REF][0].attributes;
    const { typeRef } = dmnInputData[DMN_VARIABLE][0].attributes;
    acc[id] = {
      href,
      type: feelTypes[typeRef],
    };
    return acc;
  }, {});
}

/**
 * Get questions configuration
 */
const getQuestions = (xmlExtensionElements: DMNExtensionElement[]): JSONQuestion[] => {
  const extElement = xmlExtensionElements[0] as DMNExtensionElement;
  const rulesCollection = extElement[UITV_EXECUTION_RULES];
  const rules = rulesCollection[0][UITV_EXECUTION_RULE];

  return rules.map((rule) => {
    let result: any;

    const geoReference = rule[UITV_GEO_REF];
    if (geoReference) {
      const qText = geoReference[0][UITV_QUESTION_TEXT];
      result = {
        identification: geoReference[0][UITV_LOCATION][0].attributes
          .identificatie,
        text: qText,
        type: "geo",
      };
    } else { // list or boolean
      const question = rule[UITV_QUESTION][0];
      const dataType = question[UITV_DATA_TYPE];
      const imtrType = dataType;
      const desc = rule[CONTENT_EXECUTION_RULE_EXPLANATION]?.[0];

      // TODO: decide if we want to use 'important' (nl: belangrijk) which indicates if a description
      // is important for the end-user to be able to answer the question
      // if (desc) {
      //   const important = find(desc, "content:belangrijk")[0];
      // }

      const text = question[UITV_QUESTION_TEXT];
      result = {
        description: desc?.[CONTENT_EXPLANATION],
        longDescription: desc?.[CONTENT_LONG_EXPLANATION]?.trim(),
        text,
      };

      result.autofill = getAutofillResolverKey(result.text);

      if (imtrType === "list") {
        const options = question[UITV_OPTIONS]?.[0];
        if (
          options?.[UITV_OPTION_TYPE] !==
          "enkelAntwoord"
        ) {
          result.collection = true;
        }
        const optionList = options?.[UITV_OPTION];
        result.options = optionList?.map((option: IMTROption) => option[UITV_OPTION_TEXT]);


        // because of current imtr 'list'-implementation we only accept lists of strings
        result.type = imtrType === "list" ? "string" : imtrType;
      }
    }

    result.id = rule.attributes.id; // TODO: generate our own hash for id's
    result.prio = rule[INTER_PRIORITY];
    result.uuid = rule[UITV_REUSABLE_ID];
    const x: JSONQuestion = result;
    return x;
  });
}

