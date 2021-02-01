import { assert } from "./deps.ts";
import { validateDmnText } from "./util.ts";

Deno.test("validateDmnText with test string", async () => {
  assert(validateDmnText("test") === "test");
});

Deno.test("validateDmnText with undefined", async () => {
  assert(validateDmnText(undefined) === undefined);
});

Deno.test("validateDmnText without any value", async () => {
  assert(validateDmnText() === undefined);
});

Deno.test("validateDmnText true", async () => {
  assert(validateDmnText(true) === true);
});

Deno.test("validateDmnText false", async () => {
  assert(validateDmnText(false) === false);
});

Deno.test("validateDmnText expected result", async () => {
  assert(validateDmnText("-") === "-");
});

Deno.test("validateDmnText possible bug in api", async () => {
  assert(validateDmnText("not(null)") === "-");
});
