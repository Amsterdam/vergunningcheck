import crypto from "crypto";
import fs from "fs";
import path from "path";
import util from "util";

import {
  AutofillData,
  Question,
  addQuotes,
  getChecker,
} from "@vergunningcheck/imtr-client";

import addressMock from "../__mocks__/addressMock";
import addressMockNoCityScape from "../__mocks__/addressMockNoCityScape";
import addressMockNoMonument from "../__mocks__/addressMockNoMonument";
import mockedCheckerAutofill from "../__mocks__/checker-autofill-only.json";
import mockedChecker1 from "../__mocks__/checker-dakkapel-plaatsen-mock.json";
import {
  autofillResolvers,
  cityScapeForBuildingAnswers,
  cityScapeWithoutEntityAnswers,
  getDataNeed,
  monumentAnswers,
} from "./autofill";

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

      checker.autofill(autofillResolvers, { address: addressMock });

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

      checker.autofill(autofillResolvers, { address: addressMockNoMonument });

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
      checker.autofill(autofillResolvers, { address: addressMockNoCityScape });

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

  describe("has working autofillResolvers", () => {
    const {
      cityScapeForBuilding,
      cityScapeWithoutEntity,
      monumentBoolean,
      monumentOnAddress,
    } = autofillResolvers;

    const checker = getChecker(mockedCheckerAutofill);

    const booleanQuestion = checker
      ._getAllQuestions()
      .find((q) => q.type === "boolean") as Question;

    const cityScapeScope = addressMock.restrictions.find(
      (r) => r.__typename === "CityScape"
    )?.scope as string;

    const monumentScope = addressMock.restrictions.find(
      (r) => r.__typename === "Monument"
    )?.scope as string;

    test("cityScapeForBuilding", () => {
      const cityScapeForBuildingQuestion = checker
        ._getAllQuestions()
        .find((q) => q.autofill === "cityScapeForBuilding") as Question;

      expect(cityScapeScope).toEqual("NATIONAL");

      // "National cityScape" answer
      expect(
        cityScapeForBuilding(
          { address: addressMock } as AutofillData,
          cityScapeForBuildingQuestion
        )
      ).toEqual(addQuotes(cityScapeForBuildingAnswers[cityScapeScope]));

      // "No cityScape" answer
      expect(
        cityScapeForBuilding(
          { address: addressMockNoCityScape } as AutofillData,
          cityScapeForBuildingQuestion
        )
      ).toEqual(addQuotes(cityScapeForBuildingAnswers["undefined"]));

      // Not a cityScape question
      expect(
        cityScapeForBuilding(
          { address: addressMockNoCityScape } as AutofillData,
          booleanQuestion
        )
      ).toEqual(false);
    });

    test("cityScapeWithoutEntity", () => {
      const cityScapeWithoutEntityQuestion = checker
        ._getAllQuestions()
        .find((q) => q.autofill === "cityScapeWithoutEntity") as Question;

      expect(cityScapeScope).toEqual("NATIONAL");

      // "National monument" answer
      expect(
        cityScapeWithoutEntity(
          { address: addressMock } as AutofillData,
          cityScapeWithoutEntityQuestion
        )
      ).toEqual(addQuotes(cityScapeWithoutEntityAnswers[cityScapeScope]));

      // "No monument" answer
      expect(
        cityScapeWithoutEntity(
          { address: addressMockNoCityScape } as AutofillData,
          cityScapeWithoutEntityQuestion
        )
      ).toEqual(addQuotes(cityScapeWithoutEntityAnswers["undefined"]));

      // "No monument" answer
      expect(
        cityScapeWithoutEntity(
          { address: addressMockNoCityScape } as AutofillData,
          booleanQuestion
        )
      ).toEqual(false);
    });

    test("monumentOnAddress", () => {
      expect(
        monumentOnAddress(
          { address: addressMock } as AutofillData,
          booleanQuestion
        )
      ).toEqual(addQuotes(monumentAnswers[monumentScope]));

      expect(
        monumentOnAddress(
          { address: addressMockNoMonument } as AutofillData,
          booleanQuestion
        )
      ).toEqual(addQuotes(monumentAnswers["undefined"]));
    });

    test("monumentBoolean", () => {
      expect(
        monumentBoolean(
          { address: addressMock } as AutofillData,
          booleanQuestion
        )
      ).toEqual(true);
    });
  });

  test("Documentation is up to date", async () => {
    const hash = await hashFromFile(path.join(__dirname, "autofill.ts"));

    // IF THIS TEST FAILS; update the docs first https://docs.google.com/spreadsheets/d/12ZmbRyWoeLiQe50MqlfPNx9ta6jkQD0SK42afnDlnDU/edit?usp=sharing then update the snapshot
    expect(hash).toMatchInlineSnapshot(`"065af60a83f98894026b301bfdde104f"`);
  });
});
