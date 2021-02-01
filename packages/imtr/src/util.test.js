import { assert } from "./deps.ts";
import { validateDmnText } from "./util.ts";

Deno.test("validateDmnText 1", async () => {
  assert(validateDmnText("test") === "test");
});

Deno.test("validateDmnText 2", async () => {
  assert(validateDmnText(undefined) === undefined);
});

Deno.test("validateDmnText 3", async () => {
  assert(validateDmnText(true) === true);
});

Deno.test("validateDmnText 4", async () => {
  assert(validateDmnText(false) === false);
});

Deno.test("validateDmnText 5", async () => {
  assert(validateDmnText("-") === "-");
});

Deno.test("validateDmnText 6", async () => {
  assert(validateDmnText("-") === "-");
});
