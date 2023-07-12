const { get } = require("./get.action.js");
const { blockUsers } = require("./block.action.js");
const { deleteUsers } = require("./delete.action.js");
const { getBlockedUsers } = require("./get-blocked-user.action.js");
const { blockUserNotification } = require("./block-notification.action.js");
const {
  getBlockedNotificationUsers,
} = require("./get-blocked-notification-users.action.js");

module.exports = {
  "/": {
    get: {
      action: get,
      level: "public",
    },
    post: {
      action: deleteUsers,
      level: "public",
    },
    post: {
      action: blockUsers,
      level: "public",
    },
    post: {
      action: blockUserNotification,
      level: "public",
    },
  },
  "/:id": {
    get: {
      action: getBlockedUsers,
      level: "public",
    },
    get: {
      action: getBlockedNotificationUsers,
      level: "public",
    },
  },
};
