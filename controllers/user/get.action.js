const db = require("../../models/index");
const UserModel = db.users;

module.exports.get = async (request, response) => {
  try {
    const data = await UserModel.findAll({
      attributes: ["username"],
    });

    response.status(200).json(data);
  } catch {
    response.status(500).json("Some Error Occured");
  }
};
