import * as sdk from "matrix-js-sdk";
import { needsSuggestion } from "./needsSuggestion.js";
import { suggestion } from "./suggestion.js";

const accessToken = process.env.ACCESS_TOKEN;
const homeserver = process.env.HOMESERVER ?? "matrix.codefreeze.fi";
const username = process.env.USER_NAME ?? "@guysbot";
const userId = `${username}:${homeserver}`;

const client = sdk.createClient({
  baseUrl: `https://${homeserver}`,
  accessToken,
  userId,
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

const repliedTo = {};

//Print out messages for all rooms
client.on("Room.timeline", (event, room, toStartOfTimeline) => {
  if (event.getType() !== "m.room.message") {
    console.debug("only print messages");
    return; // only print messages
  }
  if (toStartOfTimeline) {
    console.debug(`don't print paginated results`);
    return; // don't print paginated results
  }
  if (event.sender.userId === userId) {
    console.debug(`Ignore my own messages`);
    return; // Ignore my own messages
  }
  console.debug(event.event.event_id, repliedTo);
  if (repliedTo[event.event.event_id] !== undefined) {
    console.debug(`Already replied`);
    return; // Already replied
  }
  console.log(JSON.stringify(event));
  console.log(`message`, event.getContent().body);
  if (!needsSuggestion(event.getContent().body)) {
    console.debug(`message is fine`);
    return; // Message is fine
  }
  repliedTo[event.event.event_id] = true;
  client.sendEvent(
    room.roomId,
    "m.room.message",
    suggestion({
      senderName: event.sender.name,
      event_id: event.event.event_id,
    }),
    "",
    (err, res) => {
      console.log(err);
    }
  );
});

client.on("error", (err) => console.error(err));

await client.startClient({
  // Do not fetch historical messages
  initialSyncLimit: 0,
});
