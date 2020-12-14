import crypto from "crypto";
import fs from "fs";
import path from "path";
import util from "util";

const readFile = util.promisify(fs.readFile);
const hashFromFile = async (filename: string) =>
  crypto
    .createHash("md5")
    .update(await readFile(filename))
    .digest("hex");

describe("Autofill", () => {
  test("autofillResolvers", () => {
    // @TODO implement tests for autofill
  });

  test("Documentation is up to date", async () => {
    const hash = await hashFromFile(path.join(__dirname, "autofill.ts"));

    // IF THIS TEST FAILS; update the docs first https://docs.google.com/spreadsheets/d/12ZmbRyWoeLiQe50MqlfPNx9ta6jkQD0SK42afnDlnDU/edit?usp=sharing then update the snapshot
    expect(hash).toMatchInlineSnapshot(`"ae3a98fa26c387b8352565766f9d821f"`);
  });
});
