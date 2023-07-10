const db = require("../../models/index");
const UserModel = db.users;

module.exports.get = async (request, response) => {
  try {
    const user = await UserModel.findAll({});
    if (!user) {
      response.status(404).json("User Not Found");
    }

    response.status(200).json(data);
  } catch {
    response.status(500).json("Some Error Occured");
  }
};
