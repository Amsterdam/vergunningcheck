import faker from "faker/locale/nl";

import { QuestionProps, questionTypes } from "../models/question";

export const getQuestionConfig = (
  config: Partial<QuestionProps>
): QuestionProps =>
  ({
    id: faker.random.uuid(),
    type: faker.helpers.randomize(questionTypes),
    text: faker.lorem.sentence(),
    prio: faker.random.number(15) * 10,
    ...config,
  } as QuestionProps);
