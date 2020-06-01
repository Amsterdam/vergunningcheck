const parser = require("fast-xml-parser");
const get = require("lodash.get");

/**
 * Convert field-types from 'feel'-spec to our representation.
 * For now we only replace 'feel:' with nothing, but this could
 * change in the future. Therefore we extract this piece of logic.
 *
 * @example
 * feelTypeMap('feel:boolean'); // would return 'boolean'
 *
 * @param {string} feel the string according to feel spec
 * @returns {string} the resulting type string
 */
function feelTypeMap(feel) {
  return feel.replace("feel:", "");
}

/**
 * A parser for STTR-XML files
 */
class Parser {
  /**
   * @param {string} xml - STTR-XML
   */
  constructor(xml) {
    const parsed = parser.parse(xml, {
      ignoreAttributes: false,
      arrayMode: true,
    });

    const definitions = parsed["dmn:definitions"][0];
    this.name = definitions["@_name"];
    this.id = definitions["@_id"];

    this.xmlInputs = definitions["dmn:inputData"];
    this.xmlDecisions = definitions["dmn:decision"];
    [this.xmlExtensionElements] = definitions["dmn:extensionElements"];
  }

  /**
   * Get decisions configuration
   *
   * @returns {any} a configuration object for decisions
   */
  get decisions() {
    return this.xmlDecisions.reduce((xmlDecisions, xmlDecision) => {
      const res = xmlDecision["dmn:informationRequirement"].reduce(
        (acc, ir) => {
          const key = Object.keys(ir)[0]; // get the tagName
          const shortKey = `${key.split(":")[1]}s`;
          const href = ir[key][0]["@_href"];

          const result = acc;
          result[shortKey] = (result[shortKey] || []).concat(href);
          return result;
        },
        {}
      );

      const table = xmlDecision["dmn:decisionTable"][0];
      const rules = table["dmn:rule"].reduce((acc, rule) => {
        const outputEntry = get(rule, "dmn:outputEntry.0");
        const description = get(
          outputEntry,
          "dmn:extensionElements.0.content:conclusieToelichting.0.content:toelichting"
        );
        acc.push({
          inputs: rule["dmn:inputEntry"].reduce((inputEntry, ie) => {
            inputEntry.push(ie["dmn:text"]);
            return inputEntry;
          }, []),
          output: outputEntry["dmn:text"],
          description,
        });
        return acc;
      }, []);
      res.decisionTable = {
        rules,
      };
      const copy = xmlDecisions;
      copy[xmlDecision["@_id"]] = res;
      return copy;
    }, {});
  }

  /**
   * Get input configuration
   *
   * @returns {any} a configuration object for inputs
   */
  get inputs() {
    return this.xmlInputs.reduce((acc, curr) => {
      const el = curr["dmn:extensionElements"][0];
      const href = el["uitv:uitvoeringsregelRef"][0]["@_href"];
      acc[curr["@_id"]] = {
        href,
        type: feelTypeMap(curr["dmn:variable"][0]["@_typeRef"]),
      };
      return acc;
    }, {});
  }

  /**
   * Get questions configuration
   *
   * @returns {any} a configuration object for questions
   */
  get questions() {
    const rules = this.xmlExtensionElements["uitv:uitvoeringsregels"][0];
    const questions = rules["uitv:uitvoeringsregel"];

    return questions.map((curr) => {
      let result;
      if (curr["uitv:geoVerwijzing"]) {
        const question = curr["uitv:geoVerwijzing"][0];
        result = {
          identification: question["uitv:locatie"][0]["@_identificatie"],
          text: question["uitv:vraagTekst"],
          type: "geo",
        };
      } else {
        // list or boolean
        const question = curr["uitv:vraag"][0];
        const sttrType = question["uitv:gegevensType"];

        const desc = curr["content:uitvoeringsregelToelichting"];

        result = {
          text: question["uitv:vraagTekst"],
          description:
            desc && desc.length && desc[0]["content:toelichting"]
              ? desc[0]["content:toelichting"].trim()
              : undefined,
          longDescription:
            desc && desc.length && desc[0]["content:langeToelichting"]
              ? desc[0]["content:langeToelichting"].trim()
              : undefined,
        };

        if (sttrType === "list") {
          if (
            question["uitv:opties"][0]["uitv:optieType"] !== "enkelAntwoord"
          ) {
            result.collection = true;
          }
          result.options = question["uitv:opties"][0]["uitv:optie"].map(
            (option) => option["uitv:optieText"]
          );
        }

        // because of current sttr 'list'-implementation we only accept lists of strings
        result.type = sttrType === "list" ? "string" : sttrType;
      }
      result.id = curr["@_id"];
      result.prio = curr["inter:prioriteit"];
      result.uuid = curr["uitv:herbruikbaarId"];
      return result;
    });
  }

  /**
   * Bundle all configuration for Checker implementation
   *
   * @returns {any} a configuration object for Checker
   */
  getClientConfig() {
    return {
      name: this.name,
      questions: this.questions,
      inputs: this.inputs,
      decisions: this.decisions,
    };
  }
}

module.exports = (xml) => new Parser(xml).getClientConfig();
