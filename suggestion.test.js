import { test as it, describe } from "node:test";
import assert from "node:assert/strict";
import { suggestion } from "./suggestion.js";

describe("suggestion()", () => {
  it("should create a nicely formatted suggestion", () =>
    assert.deepEqual(
      suggestion({
        senderName: "username",
        event_id: "$ktTxipvbXnIN0KJ40kU1pIqO_CMK-LFhY0ywsYNfh3k",
        thread_root: "$uFeGEmT76jTLObZQT62ZiYqsTQeDRANbGuuFrguwzDE",
      }),
      {
        body: `Hei username, when addressing a group of people, please consider something more inclusive than guys, for example craftspeople, all, or folks! Thanks! 🙏🏻`,
        msgtype: "m.notice",
        format: "org.matrix.custom.html",
        formatted_body: `Hei username, when addressing a group of people, please consider something more inclusive than <em>guys</em>, for example <em>craftspeople</em>, <em>all</em>, or <em>folks</em>! Thanks! 🙏🏻`,
        "m.relates_to": {
          rel_type: "m.thread",
          event_id: "$uFeGEmT76jTLObZQT62ZiYqsTQeDRANbGuuFrguwzDE",
          "m.in_reply_to": {
            event_id: "$ktTxipvbXnIN0KJ40kU1pIqO_CMK-LFhY0ywsYNfh3k",
          },
          is_falling_back: true,
        },
      }
    ));
});
