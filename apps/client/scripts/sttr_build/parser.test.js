const fs = require("fs");
const path = require("path");
const parser = require("./parser");

describe("sttr_build parser", () => {
  test("name", () => {
    const xml = fs
      .readFileSync(path.join(__dirname, "__mocks__", "demo.dmn"))
      .toString();
    const config = parser(xml);
    expect(config.name).toBe("Conclusie STTR Test");
  });

  test("description", () => {
    const xml = fs
      .readFileSync(path.join(__dirname, "__mocks__", "tree-felling.dmn"))
      .toString();
    const config = parser(xml);
    expect(config.questions.UitvId0001.description).toBe(
      "Met een tuin of een erf wordt bedoeld de grond die bij een woning of bedrijf hoort."
    );
  });
  test("conclusion description", () => {
    const xml = fs
      .readFileSync(
        path.join(__dirname, "__mocks__", "with-conclusion-description.dmn")
      )
      .toString();
    const config = parser(xml);
    const mapping = {
      '"NeemContactOpMet"': "Uitleg bij Neem Contact Op Met.",
      '"Vergunningplicht"': "Uitleg bij Vergunningplicht.",
    };
    expect(config.decisions.dummy.decisionTable.rules.length).toBe(3);
    config.decisions.dummy.decisionTable.rules.map((rule) =>
      expect(rule.description).toBe(mapping[rule.output])
    );
  });

  xtest("structureReference", () => {
    /**
     * in ['dmn:extensionElements']['bedr:functioneleStructuurRef'] we
     * have urls like http://toepasbare-regels.omgevingswet.overheid.nl/00000001002564440000/id/concept/Conclusienl.imow-gm0363.activiteit.Dakkapelbouwen
     * it would be nice if we can expose this as "Dakkapelbouwen" so the
     * frontend can show an icon for every checker.
     */
  });
  test("questions", () => {
    const xml = fs
      .readFileSync(path.join(__dirname, "__mocks__", "demo.dmn"))
      .toString();
    const config = parser(xml);

    const inputs = {
      "input-id-wietplantage": { href: "#vraag-wietplantage", type: "boolean" },
      "input-id-aanbouwmetvergunning": {
        href: "#vraag-aanbouwmetvergunning",
        type: "boolean",
      },
    };
    const questions = {
      "vraag-wietplantage": {
        type: "boolean",
        text: "Ga je wiet plantage opzetten?",
      },
      "vraag-aanbouwmetvergunning": {
        type: "boolean",
        text:
          "Ga je een aanbouw maken waar je een vergunning voor moet aanvragen?",
      },
    };
    const decisions = {
      "decision-pad-1": {
        requiredInputs: ["#input-id-wietplantage"],
        decisionTable: {
          rules: [
            {
              inputs: [true],
              output: '"Vergunningplicht"',
            },
            {
              inputs: [false],
              output: '"no hit"',
            },
          ],
        },
      },
      "decision-pad-2": {
        requiredInputs: [
          "#input-id-wietplantage",
          "#input-id-aanbouwmetvergunning",
        ],
        decisionTable: {
          rules: [
            {
              inputs: [false, true],
              output: '"Vergunningplicht"',
            },
            {
              inputs: [true, "-"],
              output: '"no hit"',
            },
            {
              inputs: ["-", false],
              output: '"no hit"',
            },
          ],
        },
      },
      dummy: {
        requiredDecisions: ["#decision-pad-1", "#decision-pad-2"],
        decisionTable: {
          // inputs?,    // does not contain any useful data
          // output: '', // what's the use for this field?
          rules: [
            {
              inputs: ['"Vergunningplicht"', "-"],
              output: '"Vergunningplicht"',
            },
            {
              inputs: ["-", '"Vergunningplicht"'],
              output: '"Vergunningplicht"',
            },
            {
              inputs: ['"no hit"', '"no hit"'],
              output: '"Toestemmingsvrij"',
            },
          ],
        },
      },
    };
    expect(config).toMatchObject({
      questions,
      inputs,
      decisions,
    });
  });
  test("geo", () => {
    const xml = fs
      .readFileSync(path.join(__dirname, "__mocks__", "geo.dmn"))
      .toString();
    const id = "uitv__6955a83b-e19c-4014-9655-3076879ea74f";
    const questions = {
      [id]: {
        type: "geo",
        identification: "nl.imow-gm0363.gebied.4",
      },
    };
    const config = parser(xml);
    expect(config.questions[id]).toMatchObject(questions[id]);
  });
});
