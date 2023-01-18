import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { needsSuggestion } from "./needsSuggestion.js";

describe("needsSuggestion()", () => {
  const check = needsSuggestion({
    allowList: [
      "someGuysBotName",
      "https://github.com/codefreezefi/matrix-guysbot-node",
    ],
  });

  const violatingMessages = ["Hey guys!"];
  for (const msg of violatingMessages) {
    test(`${msg} should be marked as needing a suggestion`, () =>
      assert.equal(check(msg), true));
  }

  const passingMessages = [
    "Hey all!",
    // Mentioning the but should be fine.
    "Hello someGuysBotName!",
    // Mentioning the project should be fine
    `The rule is right now EXTREMELY simple. I'll add an exception: https://github.com/codefreezefi/matrix-guysbot-node/blob/aeca74bfc8f812163f712b673a0f75e67846d0d9/needsSuggestion.js#L4`,
  ];
  for (const msg of passingMessages) {
    test(`${msg} should not be marked as needing a suggestion`, () =>
      assert.equal(check(msg), false));
  }
});
