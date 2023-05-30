const db = require("../../models/index");
import { Op } from "sequelize";
const UserModel = db.users;
const FriendRequestModel = db.friend_requests;

module.exports.deleteUsers = async (request, response) => {
  try {
    const {
      body: { userIds },
    } = request;

    const deletedUsers = await UserModel.destroy({
      where: {
        id: {
          [Op.in]: userIds,
        },
      },
    });

    const data = await FriendRequestModel.destroy({
      where: {
        senderId: {
          [Op.in]: userIds,
        },
        receiverIds: {
          [Op.in]: userIds,
        },
      },
    });

    response.status(200).json("User has been deleted successfully");
  } catch {
    response.status(500).json("Some Error Occured");
  }
};
