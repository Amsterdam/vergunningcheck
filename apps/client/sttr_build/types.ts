export type Permit = any;
export type PermitId = string;
export type PermitName = string;
export type PermitConfig = Map<PermitId, PermitName>;

export type APIConfig = {
  outputDir: string;
  host: string;
  topics: { [key: string]: string[] };
};

export type ApiResult = {
  permitId: string;
  version: number;
  xml: string;
};

export type ActivitiesResponse = {
  error?: string;
};
export type PermitResponse = {
  version: number;
  sttr: string;
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
