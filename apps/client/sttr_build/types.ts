type Permit = any;
type PermitId = string;
type PermitName = string;
type PermitConfig = Map<PermitId, PermitName>;

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
