import { assert, assertEquals, dirname, fromFileUrl, join } from "./deps.ts";
import { readJson } from "./util.ts";
import parser from "./parser.ts";

const dir = dirname(fromFileUrl(import.meta.url));

Deno.test("parser name", async () => {
  const json = await readJson(join(dir, "__mocks__", "demo.dmn.json"));
  const config = await parser(json);
  assert(
    config.name === "Conclusie STTR Test",
    `${config.name} !== "Conclusie STTR Test"`
  );
});

Deno.test("description (with strFmt)", async () => {
  const json = await readJson(join(dir, "__mocks__", "tree-felling.dmn.json"));
  const config = await parser(json);
  const question = config.questions.find(({ id }) => id === "UitvId0001");
  assert(
    question.description ===
      "Met een tuin of een erf wordt bedoeld de grond die bij een woning of bedrijf hoort."
  );
});

Deno.test("conclusion description", async () => {
  const json = await readJson(
    join(dir, "__mocks__", "with-conclusion-description.dmn.json")
  );
  const config = await parser(json);
  const mapping = {
    '"NeemContactOpMet"': "Uitleg bij Neem Contact Op Met.",
    '"Vergunningplicht"': "Uitleg bij Vergunningplicht.",
  };
  assert(config.decisions.dummy.decisionTable.rules.length === 3);
  config.decisions.dummy.decisionTable.rules.map((rule) =>
    assert(rule.description === mapping[rule.output])
  );
});

// // Deno.test("structureReference", () => {
// /**
//  * in ['dmn:extensionElements']['bedr:functioneleStructuurRef'] we
//  * have urls like http://toepasbare-regels.omgevingswet.overheid.nl/00000001002564440000/id/concept/Conclusienl.imow-gm0363.activiteit.Dakkapelbouwen
//  * it would be nice if we can expose this as "Dakkapelbouwen" so the
//  * frontend can show an icon for every checker.
//  */
// // });

Deno.test("questions", async () => {
  const json = await readJson(join(dir, "__mocks__", "demo.dmn.json"));
  const config = await parser(json);

  const inputs = {
    "input-id-wietplantage": { href: "#vraag-wietplantage", type: "boolean" },
    "input-id-aanbouwmetvergunning": {
      href: "#vraag-aanbouwmetvergunning",
      type: "boolean",
    },
  };
  const questions = [
    {
      id: "vraag-wietplantage",
      type: "boolean",
      prio: 10,
      text: "Ga je wiet plantage opzetten?",
    },
    {
      id: "vraag-aanbouwmetvergunning",
      type: "boolean",
      prio: 20,
      text:
        "Ga je een aanbouw maken waar je een vergunning voor moet aanvragen?",
    },
  ];
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
  assertEquals(config, {
    name: "Conclusie STTR Test",
    questions,
    inputs,
    decisions,
  });
});

Deno.test("geo", async () => {
  const json = await readJson(join(dir, "__mocks__", "geo.dmn.json"));
  const questionId = "uitv__6955a83b-e19c-4014-9655-3076879ea74f";
  const question = {
    type: "geo",
    identification: "nl.imow-gm0363.gebied.4",
    id: questionId,
    prio: 10,
  };
  const config = await parser(json);
  assertEquals(
    config.questions.find(({ id }) => id === questionId),
    question
  );
});
