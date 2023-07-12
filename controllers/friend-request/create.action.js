const db = require("../../models/index");
const { Op } = require("sequelize");
const UserModel = db.users;
const FriendRequestModel = db.friend_requests;

module.exports.create = async (request, response) => {
  try {
    const {
      body: { senderIds, receiverId },
    } = request;

    const senders = await UserModel.findAll({
      where: {
        id: { [Op.in]: senderIds },
      },
    });

    const receiver = await UserModel.findOne({
      where: {
        id: receiverId,
      },
    });

    if (!receiver || !senders) {
      response.status(404).json("User Not Found");
    }

    const body = senders?.map((sender) => {
      return {
        senderId: sender?.senderId,
        receiverId: sender?.receiverId,
        senderName: sender?.name,
        status: "sent",
      };
    });

    const data = await FriendRequestModel.bulkCreate(body);

    response.status(200).json("Send request has been sent successfully");
  } catch {
    response.status(500).json("Some Error Occured");
  }
};
