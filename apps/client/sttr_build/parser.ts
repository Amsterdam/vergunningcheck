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

type XMLDecisionType = {
  "dmn:informationRequirement": XMLInformationRequirement[];
};

type XMLInformationRequirementAttribute = {
  href: string;
};

type XMLInformationRequirement = {
  attributes: XMLInformationRequirementAttribute[];
};

/**
 * Get decisions configuration
 *
 * @returns {any} a configuration object for decisions
 */
function getDecisions(xmlDecisions: XMLDecisionType[]) {
  return xmlDecisions.reduce((xmlDecisions, xmlDecision) => {
    const res = xmlDecision["dmn:informationRequirement"].reduce((acc, ir) => {
      const key = Object.keys(ir)[0]; // get the tagName
      const shortKey = `${key.split(":")[1]}s`;
      const href = ir[key][0]["@_href"];

      const result = acc;
      result[shortKey] = (result[shortKey] || []).concat(href);
      return result;
    }, {});

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
    const { "@_id": _, ...copy } = xmlDecisions;
    copy[getId(xmlDecision)] = res;
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
    const extEl = find(xmlInput, "dmn:extensionElements").children[0];
    const href = find(extEl, "uitv:uitvoeringsregelRef").children[0].attribs
      .href;
    const id = xmlInput.attribs.id;
    const variable = find(xmlInput, "dmn:variable").children[0];
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
    if (rule["uitv:geoVerwijzing"]) {
      const question = rule["uitv:geoVerwijzing"][0];
      result = {
        identification: question["uitv:locatie"][0]["@_identificatie"],
        text: question["uitv:vraagTekst"],
        type: "geo",
      };
    } else {
      // list or boolean
      console.log("rule", log(rule));
      const question = find(rule.children, "uitv:vraag");
      console.log("question", log(question));
      const sttrType = find(question.children, "uitv:gegevensType").children[0]
        .data;

      const desc = find(rule.children, "content:uitvoeringsregelToelichting");
      console.log("desc", log(desc));
      const explanation = desc
        ? find(desc.children, "content:toelichting").children[0]
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

      if (sttrType === "list") {
        const options = find(question.children, "uitv:opties");
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
    result.uuid = find(rule.children, "uitv:herbruikbaarId").children[0].data;

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
