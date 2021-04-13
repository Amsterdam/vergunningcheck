/*
 * The key is the name/key for the autofill-resolver
 * The value is a list of strings to look for in the question text
 **/
const autoFillMap: { resolverKey: string; questionMatchers: string[] }[] = [
  {
    resolverKey: "cityScapeForBuilding",
    questionMatchers: [
      "ligt het gebouw waarop u de zonnepanelen gaat plaatsen in een beschermd stads- of dorpsgezicht",
      "ligt het gebouw waarop u de zonneboiler gaat plaatsen in een beschermd stads- of dorpsgezicht",
      "ligt het gebouw in een beschermd stads- of dorpsgezicht",
    ],
  },
  {
    resolverKey: "cityScapeWithoutEntity",
    questionMatchers: [
      "ligt het adres waar u wilt slopen in een beschermd stads-",
    ],
  },
  /*
   * The word 'monument' is used in both the boolean and list version of the
   * monument question
   **/
  {
    resolverKey: "monumentBoolean",
    questionMatchers: ["gemeentelijk of rijksmonument"],
  },
  {
    resolverKey: "monumentList",
    questionMatchers: ["gebouw een monument"],
  },
  {
    resolverKey: "monumentOnAddress",
    questionMatchers: ["staat er een monument op het adres"],
  },
];

/**
 * This function uses herbruikbaarId (dutch for 'reusableId') to get the key
 * of the autofill resolver. Its basically a substring check
 *
 * Example:
 *  getAutofill("MONUMENT-dakkapel") returns "monument"
 */
export const getAutofillResolverKey = (
  questionText: string
): string | undefined => {
  const normalizedIdentifier = questionText.toLowerCase();
  const firstAutofillEntry = autoFillMap.find(({ questionMatchers }) => {
    return questionMatchers.find((matcher) => {
      return normalizedIdentifier.indexOf(matcher) > -1;
    });
  });
  // from the {key, strings[]} return the 'key' for the autofill-resolver
  return firstAutofillEntry?.resolverKey;
};
