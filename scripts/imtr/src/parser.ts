const ENABLE_LOGGING = 0;

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

const debug = ENABLE_LOGGING ? console.log : () => { };

type Node = {
  attributes: {
    [key: string]: string;
  };
  children: Node[],
  content: string;
  name: string;
}

// type Document = {
//   declaration: any;
//   root: Node;
// }

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
function feelTypeMap(feel: string) {
  return feel.replace("feel:", "");
}

/*
 * The key is the name/key for the autofill-resolver
 * The value is the keyword (lowercased substring) to look for
 **/
const autoFillMap = {
  cityScape: "dorpsgezicht",
  /*
   * The word 'monument' is used in both the boolean and list version of the
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
const getAutofillResolverKey = (questionText: string) => {
  debug("questionText", questionText);
  const normalizedIdentifier = questionText.toLowerCase();
  const autofillMapEntries = Object.entries(autoFillMap);
  const firstAutofillEntry = autofillMapEntries.find(
    ([, keyword]) => normalizedIdentifier.indexOf(keyword) > -1
  );
  if (firstAutofillEntry) {
    return firstAutofillEntry[0]; // from the [key, value] return the 'key' for the autofill-resolver
  }
};

const filt = (obj: any, tagName: string) => {
  return obj[tagName];
  // return arr.filter(({ name }) => name === tagName)
};

const find = (obj: any, tagName: string) => {
  return obj[tagName]?.[0];
};

const log = (obj: any) => {
  return obj;
  if (obj === undefined) return "undefined";
  if (obj.hasOwnProperty("length") && typeof obj === "object") {
    // assume collection
    return obj.map(log);
  } else {
    const { attributes, children, content, name, type } = obj;
    return type === "text"
      ? {
        content,
      }
      : {
        attributes,
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
function getDecisions(xmlDecisions: any) {
  debug("xmlDecisions", log(xmlDecisions));
  return xmlDecisions.reduce((xmlDecisions: any, xmlDecision: any) => {
    debug("xmlDecision", log(xmlDecision));

    // What does this do?
    const res = filt(xmlDecision, "dmn:informationRequirement").reduce(
      (acc: any, informationRequirement: any) => {
        debug("informationRequirement", log(informationRequirement));

        const key = Object.keys(informationRequirement)[0]; // get the tagName
        const shortKey = `${key.split(":")[1]}s`;
        debug("informationRequirement[key]", informationRequirement[key])
        const href = informationRequirement[key][0].attributes.href;

        acc[shortKey] = (acc[shortKey] || []).concat(href);
        return acc;
      },
      {}
    );

    const table = find(xmlDecision, "dmn:decisionTable");
    debug("table", log(table));

    const rules = filt(table, "dmn:rule").reduce((rules: any, rule: any) => {
      debug("rule", log(rule));
      const outputEntry = filt(rule, "dmn:outputEntry")[0];
      debug("outputEntry", log(outputEntry));

      const extensionElements = find(
        outputEntry,
        "dmn:extensionElements"
      );
      let descriptionText = undefined;
      if (extensionElements) {
        debug("extensionElements", log(extensionElements));
        const conclusionDescription = find(
          extensionElements,
          "content:conclusieToelichting"
        );
        debug("conclusionDescription", log(conclusionDescription));

        const description = find(
          conclusionDescription,
          "content:toelichting"
        );
        debug("description", log(description));
        descriptionText = description;
      }

      const output = find(outputEntry, "dmn:text");
      debug("output", log(output));
      rules.push({
        description: descriptionText,
        inputs: filt(rule, "dmn:inputEntry").reduce(
          (inputEntries: any, inputEntry: any) => {
            debug("inputEntry", inputEntry);
            const text = find(inputEntry, "dmn:text");
            debug("inputtext", text);
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
    res.decisionTable = {
      rules,
    };

    // TODO: Use consistent id's
    // const { "@_id": id, ...copy } = xmlDecisions;
    // copy[getId(res)] = res;

    xmlDecisions[xmlDecision.attributes.id] = res;
    return xmlDecisions;
  }, {});
}

/**
 * Get input configuration
 *
 * @returns {any} a configuration object for inputs
 */
function getInputData(xmlInputData: any) {
  return xmlInputData.reduce((acc: any, item: any) => {
    const { "@_id": _, ...xmlInput } = item;
    debug("xmlInput", log(xmlInput));
    const extEl = find(xmlInput, "dmn:extensionElements");
    debug("extEl", log(extEl));
    const href = find(extEl, "uitv:uitvoeringsregelRef").attributes.href;
    const id = xmlInput.attributes.id;
    debug("variable", log(find(xmlInput, "dmn:variable")));
    const variable = find(xmlInput, "dmn:variable");
    const typeRef = variable.attributes.typeRef;
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
function getExtensionElements(xmlExtensionElements: any) {
  debug("xmlExtensionElements", log(xmlExtensionElements));
  const rulesCollection = find(xmlExtensionElements, "uitv:uitvoeringsregels");
  debug("rulesCollection", log(rulesCollection));

  const rules = filt(rulesCollection, 'uitv:uitvoeringsregel');
  // .filter((rule: any) => rule);
  debug("rules", log(rules));

  return rules.map((rule: any) => {
    let result: any;
    debug("rule", log(rule));
    const geoReference = find(rule, "uitv:geoVerwijzing");
    debug("geoReference", log(geoReference));

    if (geoReference) {
      const qText = find(geoReference, "uitv:vraagTekst");
      result = {
        identification: find(geoReference, "uitv:locatie").attributes
          .identificatie,
        text: qText?.content,
        type: "geo",
      };
    } else {
      // list or boolean

      const question = find(rule, "uitv:vraag");
      debug("question", log(question));
      const dataType = find(question, "uitv:gegevensType");
      debug("dataType", log(dataType));
      const imtrType = dataType;

      const desc = find(rule, "content:uitvoeringsregelToelichting");
      debug("desc", log(desc));
      let explanation = undefined;
      if (desc) {
        const descrip = desc["content:toelichting"];
        debug("descrip", log(descrip));

        explanation = descrip || undefined;
        debug("explanation", explanation);
      }

      // TODO: decide if we want to use 'important' (nl: belangrijk) which indicates if a description
      // is important for the end-user to be able to answer the question
      // if (desc) {
      //   const important = find(desc, "content:belangrijk")[0];
      //   debug("important", log(important));
      // }

      const text = question["uitv:vraagTekst"];
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
      if (imtrType === "list") {
        const options = find(question, "uitv:opties");
        debug("options", log(options));
        if (
          find(options, "uitv:optieType") !==
          "enkelAntwoord"
        ) {
          result.collection = true;
        }
        const optionList = filt(options, "uitv:optie");
        debug("optionList", log(optionList));
        result.options = optionList.map((option: any) => {
          const textNode = find(option, "uitv:optieText");
          debug(textNode, log(textNode));
          return textNode;
        });
      }

      // because of current imtr 'list'-implementation we only accept lists of strings
      result.type = imtrType === "list" ? "string" : imtrType;
    }

    result.id = rule.attributes.id; // TODO: generate our own hash for id's

    const prio = find(rule, "inter:prioriteit");
    debug('prio', log(prio));
    result.prio = prio ? prio / 1 : null;
    result.uuid = find(rule, "uitv:herbruikbaarId");

    return result;
  });
}

/**
 * @param {string} xml - imtr-XML
 */
export default (json: any) => {

  // if (!json.root) {
  //   throw new Error('root not found');
  // }
  // debug(json.root);
  const definitions = json["dmn:definitions"][0] as any;

  // const definitions = find(json, "dmn:definitions") as any;
  // if (!json.root || !json.root.attributes) {
  //   throw new Error("Parser error, no dmn:definition found.");
  // }

  const id = definitions.attributes.id;
  const name = definitions.attributes.name;
  if (!id || !name) {
    throw new Error('Parser error, no "id" and/or "name" attribute found.')
  }

  // const definitions = filt(root, 'dmn:definitions') //; // first and only child in dmn/imtr is dmn:definitions


  const xmlExtensionElements = filt(
    definitions,
    "dmn:extensionElements"
  )[0]; // aka questions
  const xmlInputData = filt(definitions, "dmn:inputData");
  const xmlDecisions = filt(definitions, "dmn:decision");

  debug("xmlExtensionElements", log(xmlExtensionElements));

  const result = {
    decisions: getDecisions(xmlDecisions),
    inputs: getInputData(xmlInputData),
    name,
    questions: getExtensionElements(xmlExtensionElements),
  };
  return result;
}
