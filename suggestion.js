export const suggestion = ({ senderName, event_id }) => ({
  body: `Hei ${senderName}, when addressing a group of people, please consider something more inclusive than guys, for example craftspeople, all, or folks! Thanks! 🙏🏻`,
  msgtype: "m.notice",
  format: "org.matrix.custom.html",
  formatted_body: `Hei ${senderName}, when addressing a group of people, please consider something more inclusive than <em>guys</em>, for example <em>craftspeople</em>, <em>all</em>, or <em>folks</em>! Thanks! 🙏🏻`,
  "m.relates_to": {
    "m.in_reply_to": {
      event_id,
    },
  },
});
