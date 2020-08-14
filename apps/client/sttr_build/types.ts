export type Permit = any;
export type PermitId = string;
export type PermitName = string;
export type PermitConfig = Map<PermitId, PermitName>;

// type TopicConfig = {
//   slug: string,
//   permits: PermitConfig,
//   active: boolean
// };

export type APIConfig = {
  version: number;
  outputDir: string;
  host: string;
  topics: { [key: string]: string[] };
};

export type ApiResult = {
  permitId: string;
  version: number;
  xml: string;
};
export type TopicInputType = {
  _id: string;
  name: string;
  urns: string[];
};

export type TopicOutputType = {
  permits: string[];
  slug: string;
  path: string;
  name?: string;
};
