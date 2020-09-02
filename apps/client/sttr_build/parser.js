import { DomHandler } from "https://deno.land/x/domhandler/mod.ts";
import { Parser } from "https://rawcdn.githack.com/tbjgolden/deno-htmlparser2/5522f6286a17cc3857c5f1aa30e59e82968de822/htmlparser2/index.ts";

const ENABLE_LOGGING = false;

// TODO: todo implement consistent hashing for id's
// import { createHash } from "https://deno.land/std/hash/mod.ts";
// const getId = ({ "@_id": _, ...rest }) => {
//   const hash = createHash("md5");
//   hash.update(JSON.stringify(rest));
//   return hash.toString();
// };

// TODO: refactor to .ts file
// type XMLDecisionType = {
//   "dmn:informationRequirement": XMLInformationRequirement[];
// };
// type XMLInformationRequirementAttribute = {
//   href: string;
// };
// type XMLInformationRequirement = {
//   attributes: XMLInformationRequirementAttribute[];
// };

const debug = ENABLE_LOGGING ? console.log : () => {};

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
  cityScape: "dorpsgezicht",
  /*
   * The word 'monument is used in both the boolean and list version of the
   * monument question
   **/
  monumentBoolean: "gemeentelijk of rijksmonument",
  monumentList: "gebouw een monument",
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

const log = (obj) => {
  if (obj === undefined) return "undefined";
  if (obj.hasOwnProperty("length") && typeof obj === "object") {
    // assume collection
    return obj.map(log);
  } else {
    const { attribs, children, data, name, type } = obj;
    return type === "text"
      ? {
          data,
        }
      : {
          attribs,
          children: children && children.map(log),
          name,
        };
  }
};

/**
 * Get decisions configuration
 *
 * @returns {any} a configuration object for decisions
 */
// function getDecisions(xmlDecisions: XMLDecisionType[]) {
function getDecisions(xmlDecisions) {
  debug("xmlDecisions", log(xmlDecisions));
  return xmlDecisions.reduce((xmlDecisions, xmlDecision) => {
    debug("xmlDecision", log(xmlDecision));

    // What does this do?
    const res = filt(xmlDecision.children, "dmn:informationRequirement").reduce(
      (acc, informationRequirement) => {
        debug("informationRequirement", log(informationRequirement));
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
    debug("table", log(table));

    const rules = filt(table.children, "dmn:rule").reduce((rules, rule) => {
      debug("rule", log(rule));
      const outputEntry = filt(rule.children, "dmn:outputEntry")[0];
      debug("outputEntry", log(outputEntry));

      const extensionElements = find(
        outputEntry.children,
        "dmn:extensionElements"
      );
      let descriptionText = undefined;
      if (extensionElements) {
        debug("extensionElements", log(extensionElements));
        const conclusionDescription = find(
          extensionElements.children,
          "content:conclusieToelichting"
        );
        debug("conclusionDescription", log(conclusionDescription));
        const description = find(
          conclusionDescription.children,
          "content:toelichting"
        ).children[0].children;
        debug("ruledescription", log(description));
        descriptionText = description[0].data;
      }

      const output = find(outputEntry.children, "dmn:text");
      debug("output", log(output));
      rules.push({
        description: descriptionText,
        inputs: filt(rule.children, "dmn:inputEntry").reduce(
          (inputEntries, inputEntry) => {
            const text = find(inputEntry.children, "dmn:text").children[0].data;
            debug("inputtext", text);
            const map = {
              false: false,
              true: true,
            };
            inputEntries.push(map[text] !== undefined ? map[text] : text);
            return inputEntries;
          },
          []
        ),
        output: output.children[0].data,
      });
      return rules;
    }, []);
    res.decisionTable = {
      rules,
    };

    // TODO: Use consistent id's
    // const { "@_id": id, ...copy } = xmlDecisions;
    // copy[getId(res)] = res;

    xmlDecisions[xmlDecision.attribs.id] = res;
    return xmlDecisions;
  }, {});
}

/**
 * Get input configuration
 *
 * @returns {any} a configuration object for inputs
 */
function getInputData(xmlInputData) {
  return xmlInputData.reduce((acc, { "@_id": _, ...xmlInput }) => {
    debug("xmlInput", log(xmlInput));
    const extEl = find(xmlInput.children, "dmn:extensionElements").children;
    debug("extEl", log(extEl));
    const href = find(extEl, "uitv:uitvoeringsregelRef").attribs.href;
    const id = xmlInput.attribs.id;
    debug("variable", log(find(xmlInput.children, "dmn:variable")));
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
  debug("xmlExtensionElements", log(xmlExtensionElements));
  const rules = find(xmlExtensionElements, "uitv:uitvoeringsregels").children;
  debug("rules", log(rules));

  return rules.map((rule) => {
    let result;
    const geoReference = find(rule.children, "uitv:geoVerwijzing");
    debug("geoReference", log(geoReference));
    if (geoReference) {
      result = {
        identification: find(geoReference.children, "uitv:locatie").attribs
          .identificatie,
        text: find(geoReference.children, "uitv:vraagTekst").children[0].data,
        type: "geo",
      };
    } else {
      // list or boolean
      debug("rule", log(rule));
      const question = find(rule.children, "uitv:vraag");
      debug("question", log(question));
      const dataType = find(question.children, "uitv:gegevensType");
      debug("dataType", log(dataType));
      const sttrType = dataType.children[0].data;

      const desc = find(rule.children, "content:uitvoeringsregelToelichting");
      debug("desc", log(desc));
      let explanation = undefined;
      if (desc) {
        const descrip = find(desc.children, "content:toelichting").children[0];
        debug("descrip", log(descrip));

        explanation = descrip ? descrip.children[0].data : undefined;
        debug("explanation", explanation);
      }

      // TODO: decide if we want to use 'important' (nl: belangrijk) which indicates if a description
      // is important for the end-user to be able to answer the question
      // if (desc) {
      //   const important = find(desc.children, "content:belangrijk").children[0];
      //   debug("important", log(important));
      // }

      const text = find(question.children, "uitv:vraagTekst").children[0].data;
      debug("questiontext", text);

      result = {
        description: explanation,
        longDescription:
          desc && desc.length && desc[0]["content:langeToelichting"]
            ? desc[0]["content:langeToelichting"].trim()
            : undefined,
        text,
      };

      result.autofill = getAutofillResolverKey(result.text);
      debug("result", result);
      if (sttrType === "list") {
        const options = find(question.children, "uitv:opties");
        debug("options", log(options));
        if (
          find(options.children, "uitv:optieType").children[0].data !==
          "enkelAntwoord"
        ) {
          result.collection = true;
        }
        const optionList = filt(options.children, "uitv:optie");
        debug("optionList", log(optionList));
        result.options = optionList.map((option) => {
          const textNode = find(option.children, "uitv:optieText");
          debug(textNode, log(textNode));
          return textNode.children[0].data;
        });
      }

      // because of current sttr 'list'-implementation we only accept lists of strings
      result.type = sttrType === "list" ? "string" : sttrType;
    }

    result.id = rule.attribs.id; // TODO: generate our own hash for id's

    result.prio = find(rule.children, "inter:prioriteit").children[0].data / 1;
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

        debug(root);

        const id = root.attribs.id;
        const name = root.attribs.name;
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

          debug("xmlExtensionElements", log(xmlExtensionElements));

          const result = {
            decisions: getDecisions(xmlDecisions),
            inputs: getInputData(xmlInputData),
            name,
            questions: getExtensionElements(xmlExtensionElements),
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
