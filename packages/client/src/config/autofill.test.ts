import crypto from "crypto";
import fs from "fs";
import path from "path";
import util from "util";

const readFile = util.promisify(fs.readFile);
const hashFromFile = async (filename: string) => {
  const contents = await readFile(filename);
  console.log(contents.toString());
  return crypto.createHash("md5").update(contents).digest("hex");
};

describe("Autofill", () => {
  test("autofillResolvers", () => {
    // @TODO implement tests for autofill
  });

  test("Documentation is up to date", async () => {
    const hash = await hashFromFile(path.join(__dirname, "autofill.ts"));

    // IF THIS TEST FAILS; update the docs first https://docs.google.com/spreadsheets/d/12ZmbRyWoeLiQe50MqlfPNx9ta6jkQD0SK42afnDlnDU/edit?usp=sharing then update the snapshot
    expect(hash).toMatchInlineSnapshot(`"d88549cb869eb490606449e02caf1bb4"`);
  });
});
