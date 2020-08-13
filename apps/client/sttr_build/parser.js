import { createHash } from "https://deno.land/std/hash/mod.ts";
import { DomHandler } from "https://deno.land/x/domhandler/mod.ts";
import get from "https://raw.githubusercontent.com/lodash/lodash/master/get.js";
import { Parser } from "https://rawcdn.githack.com/tbjgolden/deno-htmlparser2/5522f6286a17cc3857c5f1aa30e59e82968de822/htmlparser2/index.ts";

const getId = ({ "@_id": _, ...rest }) => {
  const hash = createHash("md5");
  hash.update(JSON.stringify(rest));
  return hash.toString();
};

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

/*
 * The key is the name/key for the autofill-resolver
 * The value is the keyword (lowercased substring) to look for
 **/
const autoFillMap = {
  /*
   * The word 'monument is used in both the boolean and list version of the
   * monument question
   **/
  monumentBoolean: "gemeentelijk of rijksmonument",
  monumentList: "gebouw een monument",
  cityScape: "dorpsgezicht",
};

/**
 * This function uses herbruikbaarId (which is in dutch) to get the key
 * of the autofill resolver. Its basically a substring check
 *
 * Example:
 *  getAutofill("MONUMENT-dakkapel") returns "monument"
 *
 * @param {string} questionText - The string to look for in the autoFillMap
 *
 * @returns {undefined|string} - The matching resolver-key
 */
const getAutofillResolverKey = (questionText) => {
  const normalizedIdentifier = questionText.toLowerCase();
  const autofillMapEntries = Object.entries(autoFillMap);
  const firstAutofillEntry = autofillMapEntries.find(
    ([, keyword]) => normalizedIdentifier.indexOf(keyword) > -1
  );
  if (firstAutofillEntry) {
    return firstAutofillEntry[0]; // from the [key, value] return the 'key' for the autofill-resolver
  }
};

const filt = (arr, tagName) => arr.filter(({ name }) => name === tagName);
const find = (arr, tagName) => arr.find(({ name }) => name === tagName);
const getAttr = (xmlNode, attrName) => xmlNode.attribs[attrName].trim();
const log = (obj) => {
  if (obj === undefined) return "undefined";
  if (obj.hasOwnProperty("length") && typeof obj === "object") {
    // assume collection
    return obj.map(log);
  } else {
    const { type, name, children, attribs, data } = obj;
    return type === "text"
      ? {
          data,
        }
      : {
          name,
          attribs,
          children: children && children.map(log),
        };
  }
};

// type XMLDecisionType = {
//   "dmn:informationRequirement": XMLInformationRequirement[];
// };

// type XMLInformationRequirementAttribute = {
//   href: string;
// };

// type XMLInformationRequirement = {
//   attributes: XMLInformationRequirementAttribute[];
// };

/**
 * Get decisions configuration
 *
 * @returns {any} a configuration object for decisions
 */
// function getDecisions(xmlDecisions: XMLDecisionType[]) {
function getDecisions(xmlDecisions) {
  console.log("xmlDecisions", log(xmlDecisions));
  return xmlDecisions.reduce((xmlDecisions, xmlDecision) => {
    console.log("xmlDecision", log(xmlDecision));

    // What does this do?
    const res = filt(xmlDecision.children, "dmn:informationRequirement").reduce(
      (acc, informationRequirement) => {
        console.log("informationRequirement", log(informationRequirement));
        const requiredElement = informationRequirement.children[0];
        const shortKey = `${requiredElement.name.split(":")[1]}s`;

        const result = acc;
        result[shortKey] = (result[shortKey] || []).concat(
          requiredElement.attribs.href
        );
        return result;
      },
      {}
    );

    const table = find(xmlDecision.children, "dmn:decisionTable");
    console.log("table", log(table));

    const rules = filt(table.children, "dmn:rule").reduce((rules, rule) => {
      console.log("rule", log(rule));
      const outputEntry = filt(rule.children, "dmn:outputEntry")[0];
      console.log("outputEntry", log(outputEntry));
      const description = get(
        outputEntry,
        "dmn:extensionElements.0.content:conclusieToelichting.0.content:toelichting"
      );
      const output = find(outputEntry.children, "dmn:text");
      console.log("output", log(output));
      rules.push({
        inputs: filt(rule.children, "dmn:inputEntry").reduce(
          (inputEntries, inputEntry) => {
            const text = find(inputEntry.children, "dmn:text").children[0].data;
            console.log("text", text);
            inputEntries.push(text);
            return inputEntries;
          },
          []
        ),
        output: output.children[0].data,
        description,
      });
      return rules;
    }, []);
    res.decisionTable = {
      rules,
    };
    const { "@_id": _, ...copy } = xmlDecisions;

    copy[getId(res)] = res;
    return copy;
  }, {});
}

/**
 * Get input configuration
 *
 * @returns {any} a configuration object for inputs
 */
function getInputData(xmlInputData) {
  return xmlInputData.reduce((acc, { "@_id": _, ...xmlInput }) => {
    console.log("xmlInput", log(xmlInput));
    const extEl = find(xmlInput.children, "dmn:extensionElements").children;
    console.log("extEl", log(extEl));
    const href = find(extEl, "uitv:uitvoeringsregelRef").attribs.href;
    const id = xmlInput.attribs.id;
    console.log("variable", log(find(xmlInput.children, "dmn:variable")));
    const variable = find(xmlInput.children, "dmn:variable");
    const typeRef = variable.attribs.typeRef;
    acc[id] = {
      href,
      type: feelTypeMap(typeRef),
    };
    return acc;
  }, {});
}

/**
 * Get questions configuration
 *
 * @returns {any} a configuration object for questions
 */
function getExtensionElements(xmlExtensionElements) {
  console.log("xmlExtensionElements", log(xmlExtensionElements));
  const rules = find(xmlExtensionElements, "uitv:uitvoeringsregels").children;
  console.log("rules", log(rules));

  return rules.map((rule) => {
    let result;
    const geoReference = find(rule.children, "uitv:geoVerwijzing");
    console.log("geoReference", log(geoReference));
    if (geoReference) {
      result = {
        identification: find(geoReference.children, "uitv:locatie").attribs
          .identificatie,
        text: find(geoReference.children, "uitv:vraagTekst").children[0].data,
        type: "geo",
      };
    } else {
      // list or boolean
      console.log("rule", log(rule));
      const question = find(rule.children, "uitv:vraag");
      console.log("question", log(question));
      const dataType = find(question.children, "uitv:gegevensType");
      console.log("dataType", dataType);
      const sttrType = dataType.children[0].data;

      const desc = find(rule.children, "content:uitvoeringsregelToelichting");
      console.log("desc", log(desc));
      const explanation = desc
        ? find(desc.children, "content:toelichting").children[0].data
        : undefined;
      console.log("explanation", log(explanation));

      // if (desc) {
      //   const important = find(desc.children, "content:belangrijk").children[0]; // XXX no clue what this is
      //   console.log("important", log(important));
      // }
      const text = find(question.children, "uitv:vraagTekst").children[0].data;
      console.log("text", text);

      result = {
        text,
        desc: explanation,
        longDescription:
          desc && desc.length && desc[0]["content:langeToelichting"]
            ? desc[0]["content:langeToelichting"].trim()
            : undefined,
      };

      result.autofill = getAutofillResolverKey(result.text);
      console.log("result", result);
      if (sttrType === "list") {
        const options = find(question.children, "uitv:opties");
        console.log("options", log(options));
        if (find(options.children, "uitv:optieType").data !== "enkelAntwoord") {
          result.collection = true;
        }
        result.options = find(options.children, "uitv:optie").children.map(
          (option) => find(option, "uitv:optieText").children[0].data
        );
      }

      // because of current sttr 'list'-implementation we only accept lists of strings
      result.type = sttrType === "list" ? "string" : sttrType;
    }

    result.id = getId(rule.attribs.id); // generate our own hash for id's
    // console.log("==generate hash==");
    // console.log(curr);
    // console.log(getId(curr));
    // console.log(getId(curr));

    result.prio = find(rule.children, "inter:prioriteit").children[0].data;
    result.uuid = find(rule.children, "uitv:herbruikbaarId")?.children[0]?.data;

    return result;
  });
}

/**
 * @param {string} xml - STTR-XML
 */
export default (xml) => {
  return new Promise((resolve, reject) => {
    const handler = new DomHandler(function (error, dom) {
      if (error) {
        console.error(error);
        return reject(new Error("Parser error."));
      } else {
        // Parsing completed, do something
        const root = filt(dom, "dmn:definitions")[0];
        if (!root || !root.attribs) {
          return reject(new Error("Parser error, no dmn:definition found."));
        }

        const id = getAttr(root, "id");
        const name = getAttr(root, "name");
        if (!id || !name) {
          return reject(
            new Error('Parser error, no "id" and/or "name" attribute found.')
          );
        }

        const definitions = root.children; // first and only child in dmn/sttr is dmn:definitions

        try {
          const xmlExtensionElements = filt(
            definitions,
            "dmn:extensionElements"
          )[0].children; // aka questions
          const xmlInputData = filt(definitions, "dmn:inputData");
          const xmlDecisions = filt(definitions, "dmn:decision");

          console.log("xmlExtensionElements", log(xmlExtensionElements));

          if (id === "_5c4f8719-9d31-4ca4-953b-89d1103d3f17") {
            console.log({
              id,
              name,
              questions: xmlExtensionElements,
              inputs: xmlInputData,
              decisions: xmlDecisions,
            });
          }
          const result = {
            name: this.name,
            questions: getExtensionElements(xmlExtensionElements),
            inputs: getInputData(xmlInputData),
            decisions: getDecisions(xmlDecisions),
          };

          resolve(result);
        } catch (e) {
          console.error(`Error occured destructuring xml for "${id}: ${name}"`);
          return reject(e);
        }
      }
    });
    const parser = new Parser(handler, { xmlMode: true });
    parser.write(xml);
    parser.end();
  });
};
