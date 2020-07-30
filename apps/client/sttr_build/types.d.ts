type Permit = any;
type PermitId = string;
type PermitName = string;
type PermitConfig = Map<PermitId, PermitName>;

// type TopicConfig = {
//   slug: string,
//   permits: PermitConfig,
//   active: boolean
// };

type APIConfig = {
  // XXX why no export needed here?
  outputDir: string;
  host: string;
  topics: Map<string, string[]>;
};

type ApiResult = {
  permitId: string;
  version: number;
  xml: string;
};
