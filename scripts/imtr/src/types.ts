export type Permit = any;
export type PermitId = string;
export type PermitName = string;
export type PermitConfig = Map<PermitId, PermitName>;

export type APIConfig = {
  host: string;
  outputDir: string;
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
  sttr: string;
  version: number;
};

export type TopicInputType = {
  _id: string;
  name: string;
  urns: string[];
};

export type TopicOutputType = {
  name?: string;
  path: string;
  permits: string[];
  slug: string;
};
