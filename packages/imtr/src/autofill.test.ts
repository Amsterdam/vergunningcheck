import { getAutofillResolverKey } from "./autofill.ts";
import { assert } from "./deps.ts";

Deno.test("autofill.getAutofillResolverKey", async () => {
  assert(
    getAutofillResolverKey(
      "Ligt het adres waar u wilt slopen in een beschermd stads- of dorpsgezicht"
    ) === "cityScapeForBuilding"
  );
  assert(
    getAutofillResolverKey(
      "ligt het gebouw waarop u de zonnepanelen gaat plaatsen in een beschermd stads- of dorpsgezicht"
    ) === "cityScapeForBuilding"
  );
  assert(
    getAutofillResolverKey(
      "ligt het gebouw waarop u de zonneboiler gaat plaatsen in een beschermd stads- of dorpsgezicht"
    ) === "cityScapeForBuilding"
  );
  assert(
    getAutofillResolverKey(
      "ligt het gebouw in een beschermd stads- of dorpsgezicht"
    ) === "cityScapeForBuilding"
  );
  assert(
    getAutofillResolverKey(
      "ligt het adres waar u wilt slopen in een beschermd stads-"
    ) === "cityScapeWithoutEntity"
  );
  assert(
    getAutofillResolverKey("gemeentelijk of rijksmonument") ===
      "monumentBoolean"
  );
  assert(getAutofillResolverKey("gebouw een monument") === "monumentList");
  assert(
    getAutofillResolverKey("staat er een monument op het adres") ===
      "monumentOnAddress"
  );
});
