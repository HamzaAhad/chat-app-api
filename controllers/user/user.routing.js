const { get } = require("./get.action.js");
const { deleteUser } = require("./delete.action.js");

module.exports = {
  "/": {
    get: {
      action: get,
      level: "public",
    },
    post: {
      action: deleteUser,
      level: "public",
    },
  },
};
