import * as sdk from "matrix-js-sdk";
import { IndexedDBStore } from "matrix-js-sdk";

const accessToken = process.env.ACCESS_TOKEN;
const homeserver = process.env.HOMESERVER ?? "matrix.codefreeze.fi";
const username = process.env.USER_NAME ?? "@guysbot";
const userId = `${username}:${homeserver}`;

const client = sdk.createClient({
  baseUrl: `https://${homeserver}`,
  accessToken,
  userId,
  store: new IndexedDBStore()
});

// Automatically join rooms when invited
client.on("RoomMember.membership", (event, member) => {
  if (member.membership === "invite" && member.userId === userId) {
    console.log(`joining room`, member.roomId);
    client.joinRoom(member.roomId).then(() => {
      console.log("Auto-joined %s", member.roomId);
    });
  }
});

const needsSuggestion = (message) => /guys/.test(message);

//Print out messages for all rooms
client.on("Room.timeline", (event, room, toStartOfTimeline) => {
  if (event.getType() !== "m.room.message") {
    return; // only print messages
  }
  if (toStartOfTimeline) {
    return; // don't print paginated results
  }
  console.log(
    // the room name will update with m.room.name events automatically
    "(%s) %s :: %s",
    room.name,
    event.getSender(),
    event.getContent().body,
    toStartOfTimeline
  );
  console.log(event);
  if (needsSuggestion(event.getContent().body)) {
    console.log(event);
    client.sendEvent(
      room.roomId,
      "m.room.message",
      {
        body: `Hei ${event.sender.name}, when addressing a group of people, please consider something more inclusive then guys, for example all, or folks! Thanks! 🙏🏻`,
        msgtype: "m.notice",
        format: "org.matrix.custom.html",
        formatted_body: `Hei ${event.sender.name}, when addressing a group of people, please consider something more inclusive then <em>guys</em>, for example all, or folks! Thanks! 🙏🏻`,
        "m.relates_to": {
          "m.in_reply_to": {
            event_id: event.event_id,
          },
        },
      },
      "",
      (err, res) => {
        console.log(err);
      }
    );
  }

  process.exit(0);
});

client.on("error", (err) => console.error(err));

await client.startClient({ initialSyncLimit: 10 });
