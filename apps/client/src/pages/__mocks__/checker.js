export default {
  id: "outcomes",
  permits: [
    {
      name: "Conclusie Test outcomes/conclusions",
      questions: [
        {
          text: "Which outcome would you like to test?",
          description:
            'Please pick [one](https://en.wikipedia.org/wiki/1).\n\n![this is the alt](https://s3.eu-central-1.amazonaws.com/sttr-builder-staging.flolegal.app/00000001002564440000/hoera.gif "this is the caption")\n\nMore text.',
          longDescription:
            'You can only pick [one](https://en.wikipedia.org/wiki/1), sorry!\n\n![this is still the alt](https://s3.eu-central-1.amazonaws.com/sttr-builder-staging.flolegal.app/00000001002564440000/hoera.gif "this is still the caption")\n\nEven more text.',
          options: ["contact", "permit free", "permit required"],
          type: "string",
          id: "uitv__a9392389-1929-4de0-ac89-70050d1bb3a8",
          prio: 10,
        },
        {
          text: "Question 2",
          description: "It doesn't matter what to answer here",
          type: "boolean",
          id: "uitv__78eda8a5-4dae-455d-9e97-c0fee787b629",
          prio: 20,
        },
      ],
      inputs: {
        "input__a9392389-1929-4de0-ac89-70050d1bb3a8": {
          href: "#uitv__a9392389-1929-4de0-ac89-70050d1bb3a8",
          type: "string",
        },
        "input__78eda8a5-4dae-455d-9e97-c0fee787b629": {
          href: "#uitv__78eda8a5-4dae-455d-9e97-c0fee787b629",
          type: "boolean",
        },
      },
      decisions: {
        "_e128d157-596f-4e5b-87c2-495145a66e85": {
          requiredInputs: ["#input__a9392389-1929-4de0-ac89-70050d1bb3a8"],
          decisionTable: {
            rules: [
              {
                inputs: ['"contact"'],
                output: '"NeemContactOpMet"',
              },
              {
                inputs: ['"permit free"'],
                output: '"no hit"',
              },
              {
                inputs: ['"permit required"'],
                output: '"no hit"',
              },
            ],
          },
        },
        "_97c25487-0f5d-41fa-9dc7-9c5a1647b438": {
          requiredInputs: [
            "#input__a9392389-1929-4de0-ac89-70050d1bb3a8",
            "#input__78eda8a5-4dae-455d-9e97-c0fee787b629",
          ],
          decisionTable: {
            rules: [
              {
                inputs: ['"permit required"', true],
                output: '"Vergunningplicht"',
              },
              {
                inputs: ['"permit required"', false],
                output: '"Vergunningplicht"',
              },
              {
                inputs: ['"contact"', "-"],
                output: '"no hit"',
              },
              {
                inputs: ['"permit free"', "-"],
                output: '"no hit"',
              },
            ],
          },
        },
        dummy: {
          requiredDecisions: [
            "#_e128d157-596f-4e5b-87c2-495145a66e85",
            "#_97c25487-0f5d-41fa-9dc7-9c5a1647b438",
          ],
          decisionTable: {
            rules: [
              {
                inputs: ['"NeemContactOpMet"', "-"],
                output: '"NeemContactOpMet"',
                description: "Please contact Gemeente.",
              },
              {
                inputs: ["-", '"Vergunningplicht"'],
                output: '"Vergunningplicht"',
                description: "You need a permit!",
              },
              {
                inputs: ['"no hit"', '"no hit"'],
                output: '"Toestemmingsvrij"',
                description: "Do whatever...",
              },
            ],
          },
        },
      },
    },
  ],
};
