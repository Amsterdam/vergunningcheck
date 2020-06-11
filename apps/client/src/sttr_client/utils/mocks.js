import faker from "faker/locale/nl";

import { questionTypes } from "../models/question";

export const getQuestionConfig = (data) => ({
  id: faker.random.uuid(),
  type: faker.helpers.randomize(questionTypes),
  text: faker.lorem.sentence(),
  prio: faker.random.number(15) * 10,
  ...data,
});

export const getRuleConfig = ([inputConditions, outputValue, description]) => [
  inputConditions || [true, false],
  outputValue || "not sure",
  description || faker.lorem.sentence(),
];

// const getChecker = (questions) => {
//   const d1 = new Decision("dummy", questions, [
//     new Rule([false], "no"),
//     new Rule([true, false], "not sure"),
//     new Rule([true, true], "yes"),
//   ]);
//   const dummy = new Decision(
//     "dummy",
//     [d1],
//     [
//       new Rule(["no"], "nope"),
//       new Rule(["not sure"], "what?"),
//       new Rule(["yes"], "hell yeah"),
//     ]
//   );
//   return new Checker([new Permit("drivers-licence", [dummy])]);
// };
