// XML fields for executable-rules (uitv-spec) from IMTR
export const UITV_DATA_TYPE = "uitv:gegevensType";
export const UITV_EXECUTION_RULE = "uitv:uitvoeringsregel";
export const UITV_EXECUTION_RULE_REF = "uitv:uitvoeringsregelRef";
export const UITV_EXECUTION_RULES = "uitv:uitvoeringsregels";
export const UITV_GEO_REF = "uitv:geoVerwijzing";
export const UITV_LOCATION = "uitv:locatie";
export const UITV_LOCATION_IDENTIFICATION = "identificatie";
export const UITV_OPTION = "uitv:optie";
export const UITV_OPTION_TEXT = "uitv:optieText";
export const UITV_OPTION_TYPE = "uitv:optieType";
export const UITV_OPTIONS = "uitv:opties";
export const UITV_QUESTION = "uitv:vraag";
export const UITV_QUESTION_TEXT = "uitv:vraagTekst";
export const UITV_REUSABLE_ID = "uitv:herbruikbaarId";
export const UITV_RULE_GROUP_REF = "uitv:regelgroepRef";
export const UITV_SEQUENCE_ID = "uitv:sequenceId";

// XML fields for interaction-rules (inter-spec) from IMTR
export const INTER_NAME = "inter:naam";
export const INTER_PRIORITY = "inter:prioriteit";
export const INTER_RULE_GROUP = "inter:regelgroep";
export const INTER_RULE_GROUPS = "inter:regelgroepen";

// XML fields for company-rules (bedr-spec) from IMTR
export const BEDR_FUNCTIONAL_STRUCTURE_REF = "bedr:functioneleStructuurRef";

// XML fields for content-spec from IMTR
export const CONTENT_CONCLUSION_EXPLANATION = "content:conclusieToelichting";
export const CONTENT_EXECUTION_RULE_EXPLANATION =
  "content:uitvoeringsregelToelichting";
export const CONTENT_EXPLANATION = "content:toelichting";
export const CONTENT_IMPORTANT = "content:belangrijk";
export const CONTENT_LONG_EXPLANATION = "content:langeToelichting";

// XML fields for dmn-spec
// https://www.omg.org/spec/DMN/About-DMN/
export const DMN_DECISION = "dmn:decision";
export const DMN_DECISION_TABLE = "dmn:decisionTable";
export const DMN_DEFINITIONS = "dmn:definitions";
export const DMN_EXTENSION_ELEMENTS = "dmn:extensionElements";
export const DMN_INFORMATION_REQUIREMENT = "dmn:informationRequirement";
export const DMN_INPUT = "dmn:input";
export const DMN_INPUT_DATA = "dmn:inputData";
export const DMN_INPUT_ENTRY = "dmn:inputEntry";
export const DMN_INPUT_EXPRESSION = "dmn:inputExpression";
export const DMN_OUTPUT = "dmn:output";
export const DMN_OUTPUT_ENTRY = "dmn:outputEntry";
export const DMN_OUTPUT_VALUES = "dmn:outputValues";
export const DMN_REQUIRED_DECISION = "dmn:requiredDecision";
export const DMN_REQUIRED_INPUT = "dmn:requiredInput";
export const DMN_RULE = "dmn:rule";
export const DMN_TEXT = "dmn:text";
export const DMN_VARIABLE = "dmn:variable";

// Map field-types from 'feel'-spec to our representation.
export const feelTypes = {
  "feel:boolean": "boolean",
  "feel:string": "string",
};

export type DMNDocument = {
  [DMN_DEFINITIONS]: DMNDefinition[];
};

export type DMNDefinition = {
  attributes: DMNDefinitionAttributes;
  [DMN_EXTENSION_ELEMENTS]: DMNExtensionElement[];
  [DMN_INPUT_DATA]: DMNInputData[];
  [DMN_DECISION]: DMNDecision[];
};

export type DMNDefinitionAttributes = {
  exporter: "Geodan FLO Legal STTR Builder";
  exporterVersion: string;
  id: string;
  name: string;
  namespace: "http://toepasbare-regels.omgevingswet.overheid.nl/00000001002564440000";
  "xmlns:dmn": "http://www.omg.org/spec/DMN/20151101/dmn.xsd";
  "xmlns:feel": "http://www.omg.org/spec/FEEL/20140401";
  "xmlns:xsd": "http://www.w3.org/2001/XMLSchema";
  "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance";
  "xmlns:inter": "http://toepasbare-regels.omgevingswet.overheid.nl/v1.0/Interactieregel";
  "xmlns:bedr": "http://toepasbare-regels.omgevingswet.overheid.nl/v1.0/Bedrijfsregel";
  "xmlns:uitv": "http://toepasbare-regels.omgevingswet.overheid.nl/v1.0/Uitvoeringsregel";
  "xmlns:content": "http://toepasbare-regels.omgevingswet.overheid.nl/v1.0/Content";
  xmlns: "http://toepasbare-regels.omgevingswet.overheid.nl/00000001002564440000";
};

export type DMNVariable = {
  attributes: {
    id: string;
    name: string;
    typeRef: TypeRef;
  };
};

export type DMNInput = {
  attributes: {
    id: string;
    label: string;
  };
  [DMN_INPUT_EXPRESSION]: {
    attributes: {
      typeRef: TypeRef;
    };
    [DMN_TEXT]: string;
  }[];
};

export type DMNOutput = {
  attributes: {
    id: string;
    label: string;
  };
  [DMN_OUTPUT_VALUES]: {
    [DMN_TEXT]: string;
  }[];
};

export type DMNInputEntry = {
  attributes: {
    id: string;
  };
  [DMN_TEXT]: boolean | string;
};

export type DMNRule = {
  attributes: {
    id: string;
  };
  [DMN_INPUT_ENTRY]: DMNInputEntry[];
  [DMN_OUTPUT_ENTRY]: {
    attributes: {
      id: string;
    };
    [DMN_TEXT]: string;
    [DMN_EXTENSION_ELEMENTS]?: {
      [CONTENT_CONCLUSION_EXPLANATION]: {
        [CONTENT_EXPLANATION]: string;
      }[];
    }[];
  }[];
};

export type DMNExtensionElement = {
  [INTER_RULE_GROUPS]: {
    [INTER_RULE_GROUP]: IMTRRuleGroup[];
  }[];
  [UITV_EXECUTION_RULES]: {
    [UITV_EXECUTION_RULE]: IMTRExecutionRule[];
  }[];
};

export type DMNDecision = {
  attributes: {
    id: string;
    name: string;
  };
  [DMN_VARIABLE]: DMNVariable[];
  [DMN_EXTENSION_ELEMENTS]?: {
    [BEDR_FUNCTIONAL_STRUCTURE_REF]: {
      attributes: {
        href: string;
      };
    }[];
  }[];
  [DMN_INFORMATION_REQUIREMENT]: DMNInformationRequirement[];
  [DMN_DECISION_TABLE]: {
    attributes: {
      hitPolicy: HitPolicy;
      id: string;
      outputLabel: string;
    };
    [DMN_INPUT]: DMNInput[];
    [DMN_OUTPUT]: DMNOutput[];
    [DMN_RULE]: DMNRule[];
  }[];
};

export type RequiredInputOrDecision = {
  attributes: {
    href: string;
  };
};

export type DMNInformationRequirement = {
  // improve with union ??
  [DMN_REQUIRED_INPUT]?: RequiredInputOrDecision[];
  [DMN_REQUIRED_DECISION]?: RequiredInputOrDecision[];
};

export type DMNInputData = {
  attributes: {
    id: string;
    label: string;
    name: string;
  };
  [DMN_EXTENSION_ELEMENTS]: {
    [UITV_EXECUTION_RULE_REF]: {
      attributes: {
        href: string;
      };
    }[];
  }[];
  [DMN_VARIABLE]: DMNVariable[];
};

export type HitPolicy = "ANY";

// Imtr extensions to DMN
export type IMTRRuleGroup = {
  attributes: {
    id: string;
  };
  [INTER_NAME]: string;
  [INTER_PRIORITY]: number;
};

export type IMTROption = {
  [UITV_SEQUENCE_ID]: number;
  [UITV_OPTION_TEXT]: string;
};

export type IMTRQuestionOptionType = "enkelAntwoord"; // singleAnswer

export type IMTRQuestionOptions = {
  [UITV_OPTION_TYPE]: IMTRQuestionOptionType;
  [UITV_OPTION]: IMTROption[];
};

export type IMTRQuestionDataType = "boolean" | "list";

export type IMTRQuestion = {
  [UITV_DATA_TYPE]: IMTRQuestionDataType;
  [UITV_QUESTION_TEXT]: string;
  [UITV_OPTIONS]?: [IMTRQuestionOptions];
};

export type IMTRExecutionRule = {
  attributes: {
    id: string;
  };
  [UITV_REUSABLE_ID]?: string;
  [UITV_GEO_REF]?: {
    [UITV_QUESTION_TEXT]: string;
    [UITV_LOCATION]: {
      attributes: {
        [UITV_LOCATION_IDENTIFICATION]: string;
      };
    }[];
  }[];
  [UITV_RULE_GROUP_REF]: {
    attributes: {
      href: "#groep1";
    };
  }[];
  [INTER_PRIORITY]: number;
  [UITV_QUESTION]: IMTRQuestion[];
  [CONTENT_EXECUTION_RULE_EXPLANATION]?: {
    [CONTENT_EXPLANATION]: string;
    [CONTENT_IMPORTANT]: boolean;
    [CONTENT_LONG_EXPLANATION]?: string;
  }[];
};

export type TypeRef = "feel:boolean" | "feel:string";
