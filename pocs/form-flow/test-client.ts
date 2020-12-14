import { readFileSync } from "fs";
import imtr_build from "../../packages/imtr/src/parser";
// import { getChecker } from "../../packages/imtr-client/src";

const jsonFile = process.argv[2];
const json = JSON.parse(readFileSync(jsonFile, "utf8"));
// console.log(json);

const parsed = imtr_build(json);
const config = {
  permits: [parsed],
};

console.log(JSON.stringify(config, null, 2));
// // console.log(config.permits[0].questions);

// const checker = getChecker(config);
// console.log(checker);
