const db = require("../../models/index");
const UserModel = db.users;
const FriendRequestModel = db.friend_requests;

module.exports.accept = async (request, response) => {
  try {
    const {
      body: { id },
    } = request;

    const req = await FriendRequestModel.findOne({
      where: {
        id,
      },
    });

    if (!req) {
      response.status(404).json("User Not Found");
    }

    const data = await FriendRequestModel.update(
      {
        status: "sent",
      },
      {
        where: { id },
      }
    );

    response.status(200).json("Send request has been sent successfully");
  } catch {
    response.status(500).json("Some Error Occured");
  }
};
