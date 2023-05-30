const db = require("../../models/index");
const UserModel = db.users;
const FriendRequestModel = db.friend_requests;

module.exports.create = async (request, response) => {
  try {
    const {
      body: { senderId, receiverId },
    } = request;

    const sender = await UserModel.findOne({
      where: {
        id: senderId,
      },
    });

    const receiver = await UserModel.findOne({
      where: {
        id: receiverId,
      },
    });

    if (!receiver || !sender) {
      response.status(404).json("User Not Found");
    }

    const data = await FriendRequestModel.create({
      senderId,
      receiverId,
      senderName: sender?.name,
      status: "sent",
    });

    response.status(200).json("Send request has been sent successfully");
  } catch {
    response.status(500).json("Some Error Occured");
  }
};
