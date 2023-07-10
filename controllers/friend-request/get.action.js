const db = require("../../models/index");
const UserModel = db.users;
const FriendRequestModel = db.friend_requests;

module.exports.get = async (request, response) => {
  try {
    const {
      query: { id },
    } = request;

    const user = await UserModel.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      response.status(404).json("User Not Found");
    }

    const data = await FriendRequestModel.findAll({
      where: {
        receiverId: id,
        status: "sent",
      },
      order: [["createdAt", "DESC"]],
    });

    response.status(200).json(data);
  } catch {
    response.status(500).json("Some Error Occured");
  }
};
