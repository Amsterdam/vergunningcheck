import getChecker from "./index";

describe("imtr client", () => {
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
