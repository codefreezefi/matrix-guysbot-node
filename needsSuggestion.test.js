import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { needsSuggestion } from "./needsSuggestion.js";

describe("needsSuggestion()", () => {
  const violatingMessages = ["Hey guys!"];
  for (const msg of violatingMessages) {
    test(`${msg} should be marked as needing a suggestion`, () =>
      assert.equal(needsSuggestion(msg), true));
  }

  const passingMessages = ["Hey all!"];
  for (const msg of passingMessages) {
    test(`${msg} should not be marked as needing a suggestion`, () =>
      assert.equal(needsSuggestion(msg), false));
  }
});
