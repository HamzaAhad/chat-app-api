const { get } = require("./get.action.js");

module.exports = {
  "/": {
    get: {
      action: get,
      level: "public",
    },
    // post: {
    //   action: create,
    //   level: "public",
    // },
  },
};
