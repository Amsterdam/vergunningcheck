/*
 * The key is the name/key for the autofill-resolver
 * The value is the keyword (lowercased substring) to look for
 **/
const autoFillMap = {
  cityScape: "ligt het gebouw in een beschermd stads-",
  cityScapeSlopen: "ligt het adres waar u wilt slopen in een beschermd stads-",
  /*
   * The word 'monument' is used in both the boolean and list version of the
   * monument question
   **/
  monumentBoolean: "gemeentelijk of rijksmonument",
  monumentList: "gebouw een monument",
  monumentOnAddress: "staat er een monument op het adres",
};

/**
 * This function uses herbruikbaarId (which is in dutch) to get the key
 * of the autofill resolver. Its basically a substring check
 *
 * Example:
 *  getAutofill("MONUMENT-dakkapel") returns "monument"
 */
export const getAutofillResolverKey = (
  questionText: string
): string | undefined => {
  const normalizedIdentifier = questionText.toLowerCase();
  const autofillMapEntries = Object.entries(autoFillMap);
  const firstAutofillEntry = autofillMapEntries.find(
    ([, keyword]) => normalizedIdentifier.indexOf(keyword) > -1
  );
  if (firstAutofillEntry) {
    return firstAutofillEntry[0]; // from the [key, value] return the 'key' for the autofill-resolver
  }
};
