const { get } = require("./get.action.js");
const { deleteUsers } = require("./delete.action.js");

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
  },
};
