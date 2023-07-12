const db = require("../../models/index");
const UserModel = db.users;
const FriendRequestModel = db.friend_requests;

module.exports.accept = async (request, response) => {
  try {
    const {
      body: { senderId, recieverId },
    } = request;

    const req = await FriendRequestModel.findOne({
      where: {
        id: [senderId, recieverId],
      },
    });

    if (!req) {
      response.status(404).json("User Not Found");
    }

    const data = await FriendRequestModel.update(
      {
        status: "accepted",
      },
      {
        where: { senderId, recieverId },
      }
    );

    response.status(200).json("Send request have been accepted");
  } catch {
    response.status(500).json("Some Error Occured");
  }
};
