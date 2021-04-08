import fs from "fs";
import path from "path";
import { promisify } from "util";

import { Answer, Question, getChecker } from "@vergunningcheck/imtr-client";

const readDir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

type Outcome = number | null;
// type AnswerOptions = Outcome;
// type Question = AnswerOptions[]

// type Tree = Tree[] | Outcome;

type Question = (Question | Outcome)[];
type RootQuestion = (Question | Outcome)[]
type Tree = [RootQuestion];

// https://www.typescriptlang.org/docs/handbook/advanced-types.html
// type Tree<T> = {
//   value: T;
//   left?: Tree<T>;
//   right?: Tree<T>;
// };
// class Tree {
//   constructor(children: Tree) {
//     this.children = children;
//   }
//   parent();
//   children();
//   next();
//   rewindTo();
// }

// Example tree of 1 boolean question
const tree1: Tree = [ // array of 1, bottom of tree, first question
  [ // first boolean question, answer = true
    0 // outcome is 0
  ],
  [ // first boolean question, answer = false
    1 // outcome is 1
  ],
];

// Example tree of 1 list question
const tree2: Tree = [ // array of 1, bottom of tree, first question
  // first option in list question, answer = 1
  'permit-free'
  ,
  // second option in list question, answer = 2
  'need-permit'
  ,
  // third option in list question, answer = 3
  'permit-free'
  ,
];

/* Example tree of objects instead of
wat willen we testen
- volgorde van vragen !!!
- versienummer vd permit
- de uitkomsten bij verschillende antwoord-paden

    slopen.json
    [
      [
        'permit-free'
      ],
      [
        [
          'permit-free',
          'need-permit',
        ],
        'need-permit'
      ]
    ]
*/
const tree2: {
  type: 'boolean',
  answers: [
    subsequentQuestion: {
      type: 'boolean',
      answers: [
        {
          value: true,
          subsequentQuestion: {
            type: 'boolean',
            answers: [
              {
                value: true,
                outcome: 1,
              }
            ]
          }
        }, {
          value: false,
          subsequentQuestion: {
            type: 'boolean',
          }
        }
      ]
    }
  ]
];


// Example tree of 2 boolean + 1 list question
const treeCombined: Tree = [ // array of 1, bottom of tree, first question
  // first option in list question, answer = 1
  0 // outcome is 0
  ,
  // first option in list question, answer = 2
  [ // question-y
    // first boolean question, answer = true
    0 // outcome is 0
    ,
    // first boolean question, answer = false
    1 // outcome is 1
    ,
  ]
  ,
  // first option in list question, answer = 3
  // question-z
  [ // first boolean question, answer = true
    2 // outcome is 0
  ],
  [ // first boolean question, answer = false
    1 // outcome is 1
  ],
];


const getNextUnansweredOption = (tree: Tree) => {
  const questionIndex = 0;
  while (options = tree[questionIndex]) {
    if (tree) {

    }
  }
}

describe("imtr", () => {
  it("has consistent outcomes", async () => {
    const files = await readDir(path.join(__dirname, "..", "public", "imtr"));
    const trees = files.map(async (file) => {
      const fileContent = await readFile(file);

      let topicTree: Tree = [];

      while (!topicTree.flat().includes(null)) {
        const checker = getChecker(fileContent);

        let questionIndex = 0;
        let pointer: Tree;

        while (!checker.done) {
          pointer = topicTree[questionIndex];
          const question = checker.next() as Question;
          pointer = Array(
            question.type === "boolean" ? 2 : question.options?.length
          ).fill(null);

          const numAnswers = pointer.length;
          if (numPossibleAnswers > numAnswers) {
            const answer;
            question.setAnswer(answer);
          }
          questionIndex++;
          checker.next();
        }
      }
      // do {
      //   const numAnswers = pointer.length;
      //   const numPossibleAnswers = question.type === 'boolean' ? 2 : question?.options?.length;

      //   questionIndex++;
      //   pointer = pointer[questionIndex];
      // } while (question = checker.next());

      return tree;
    });
    expect(trees).toMatchSnapshot();
  });
});
