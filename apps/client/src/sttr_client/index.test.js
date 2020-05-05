import fs from "fs";
import path from "path";
import { promisify } from "util";
import getChecker from ".";

const readdir = promisify(fs.readdir);

const buildDir = path.join(__dirname, "../../.build");

const randbool = () => Math.random() >= 0.5;
const getConfigFromFile = (filename) => {
  const filepath = path.join(buildDir, filename);
  const buffer = fs.readFileSync(filepath);
  return JSON.parse(buffer.toString());
};

const getCheckerFromFile = (filename) =>
  getChecker(getConfigFromFile(filename));

const play = (checker) => {
  let question = checker.next();
  while (question) {
    if (question.type === "boolean") {
      question.setAnswer(randbool());
    } else {
      question.setAnswer("sure! why not.");
    }
    question = checker.next();
  }
};

describe("sttr client", () => {
  test("getChecker", () => {
    expect(() => {
      getChecker({
        permits: [],
      });
    }).toThrow("Permits cannot be empty.");

    expect(() => {
      getChecker({
        permits: [
          {
            questions: [
              {
                id: "abc",
                type: "boolean",
                text:
                  "Gaat u met de aanbouw meer dan 50% van het perceel bebouwen dat binnen de bestemming &#39;tuin&#39;?",
                prio: 10,
              },
            ],
            decisions: [{ b: 2 }],
          },
        ],
      });
    }).toThrow("Either 'requiredInputs' or 'requiredDecisions' are needed");
  });
});
