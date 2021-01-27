import crypto from "crypto";
import fs from "fs";
import path from "path";
import util from "util";

import { Question, getChecker } from "@vergunningcheck/imtr-client";

import addressMock1 from "../__mocks__/addressMock";
import addressMock3 from "../__mocks__/addressMockNoCityScape";
import addressMock2 from "../__mocks__/addressMockNoMonument";
import mockedChecker1 from "../__mocks__/checker-dakkapel-plaatsen-mock.json";
import { autofillResolvers, getDataNeed } from "./autofill";

const readFile = util.promisify(fs.readFile);
const hashFromFile = async (filename: string) =>
  crypto
    .createHash("md5")
    .update(await readFile(filename))
    .digest("hex");

describe("Autofill", () => {
  describe("works on checker", () => {
    test("with address 1", () => {
      const checker = getChecker(mockedChecker1);
      expect(checker.stack).toEqual([]);
      expect(checker._getAllQuestions()[0].answer).toEqual(undefined);

      checker.autofill(autofillResolvers, { address: addressMock1 });

      const cityscapeQuestion = checker
        ._getAllQuestions()
        .find((q) => q.autofill === "cityScapeForBuilding") as Question;
      const monumentQuestion = checker
        ._getAllQuestions()
        .find((q) => q.autofill === "monumentList") as Question;

      expect(monumentQuestion.answer).toBe('"Gemeentelijk monument"');
      expect(cityscapeQuestion.answer).toBe(
        '"Ja, het gebouw ligt in een rijksbeschermd stads- of dorpsgezicht."'
      );
    });

    test("with address 2", () => {
      const checker = getChecker(mockedChecker1);
      expect(checker.stack).toEqual([]);
      expect(checker._getAllQuestions()[0].answer).toEqual(undefined);

      checker.autofill(autofillResolvers, { address: addressMock2 });

      const cityscapeQuestion = checker
        ._getAllQuestions()
        .find((q) => q.autofill === "cityScapeForBuilding") as Question;
      const monumentQuestion = checker
        ._getAllQuestions()
        .find((q) => q.autofill === "monumentList") as Question;

      expect(monumentQuestion.answer).toBe('"Geen monument"');
      expect(cityscapeQuestion.answer).toBe(
        '"Ja, het gebouw ligt in een gemeentelijk beschermd stads- of dorpsgezicht."'
      );
    });

    test("with address 3", () => {
      const checker = getChecker(mockedChecker1);
      expect(checker.stack).toEqual([]);
      checker.autofill(autofillResolvers, { address: addressMock3 });

      const cityscapeQuestion = checker
        ._getAllQuestions()
        .find((q) => q.autofill === "cityScapeForBuilding") as Question;
      const monumentQuestion = checker
        ._getAllQuestions()
        .find((q) => q.autofill === "monumentList") as Question;

      expect(monumentQuestion.answer).toBe('"Geen monument"');
      expect(cityscapeQuestion.answer).toBe(
        '"Nee, het gebouw ligt niet in een beschermd stads- of dorpsgezicht."'
      );
    });

    test("without address", () => {
      const checker = getChecker(mockedChecker1);
      expect(checker.stack).toEqual([]);
      checker.autofill(autofillResolvers, {});

      const cityscapeQuestion = checker
        ._getAllQuestions()
        .find((q) => q.autofill === "cityScapeForBuilding") as Question;
      const monumentQuestion = checker
        ._getAllQuestions()
        .find((q) => q.autofill === "monumentList") as Question;

      expect(monumentQuestion.answer).toBe('"Geen monument"');
      expect(cityscapeQuestion.answer).toBe(
        '"Nee, het gebouw ligt niet in een beschermd stads- of dorpsgezicht."'
      );
    });
  });

  test("works with getDataNeed", () => {
    const checker = getChecker(mockedChecker1);
    const skipLocationSection = !!(checker && !getDataNeed(checker));

    expect(skipLocationSection).toEqual(false);
  });

  test("works by manually calling autofillResolvers", () => {
    // @TODO implement manual tests for autofill
    // There is still some test coverage to gain...
  });

  test("Documentation is up to date", async () => {
    const hash = await hashFromFile(path.join(__dirname, "autofill.ts"));

    // IF THIS TEST FAILS; update the docs first https://docs.google.com/spreadsheets/d/12ZmbRyWoeLiQe50MqlfPNx9ta6jkQD0SK42afnDlnDU/edit?usp=sharing then update the snapshot
    expect(hash).toMatchInlineSnapshot(`"ae3a98fa26c387b8352565766f9d821f"`);
  });
});
