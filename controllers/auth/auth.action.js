const db = require("../../models/index");
const UserModel = db.users;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const config = require("../../config/auth.config");

//middlewares

module.exports.checkDuplicateUsernameOrEmail = async (req, res, next) => {
  // Username
  console.log("middleware", req.body);
  UserModel.findOne({
    where: {
      username: req.body.username,
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.send({
        message: "Failed! Email is already in use!",
      });
      return;
    }
    next();
  });
};

//Signup Login

module.exports.signup = async (req, res) => {
  UserModel.create({
    name: req?.body?.name,
    email: req?.body?.email,
    password: bcrypt.hashSync(req.body.password, 8),
  }).then(() => {
    res.send({ message: "USER REGISTERED" });
  });
};

module.exports.signin = async (req, res) => {
  UserModel.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      console.log(user);
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 1.577e8, // 24 hours
      });

      res.status(200).send({
        id: user.id,
        name: user.username,
        email: user.email,
        accessToken: token,
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ message: err.message });
    });
};

module.exports.changePassword = async (req, res) => {
  try {
    const user = UserModel.findOne({
      where: {
        username: req.body.username,
      },
    });

    console.log(user);
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(
      req.body.currentPassword,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    UserModel.update(
      {
        password: bcrypt.hashSync(req.body.newPassword, 8),
      },
      {
        where: { id: user?.id },
      }
    );
  } catch {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};
