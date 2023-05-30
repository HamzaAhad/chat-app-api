const { get } = require("./get.action.js");
const { create } = require("./create.action.js");
const { accept } = require("./accept.action.js");

module.exports = {
  "/": {
    get: {
      action: get,
      level: "public",
    },
    post: {
      action: create,
      level: "public",
    },
    put: {
      action: accept,
      level: "public",
    },
  },
};
