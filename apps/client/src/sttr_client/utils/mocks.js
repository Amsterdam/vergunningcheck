import faker from "faker/locale/nl";

import { questionTypes } from "../models/question";

export const getQuestionConfig = (config) => ({
  id: faker.random.uuid(),
  type: faker.helpers.randomize(questionTypes),
  text: faker.lorem.sentence(),
  prio: faker.random.number(15) * 10,
  ...config,
});
