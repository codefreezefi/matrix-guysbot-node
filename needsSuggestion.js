/**
 * Returns true for messages that should receive a suggest to for better wording.
 */
export const needsSuggestion = (message) => /guys/.test(message);
