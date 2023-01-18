/**
 * Returns true for messages that should receive a suggest to for better wording.
 *
 * The optional 'allowList' parameter contains a list of strings that are
 * removed from the original message before checking it for the appearance of
 * the word 'guys'.
 */
export const needsSuggestion =
  ({ allowList }) =>
  (message) =>
    /guys/.test(
      (allowList ?? []).reduce(
        (replacedMessaged, allowedString) =>
          replacedMessaged.replaceAll(allowedString, ""),
        message
      )
    );
