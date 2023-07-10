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
  // Username
  console.log("request", req.body.username, req.body.password, req.body);
  // res.send({ message: "USER REGISTERED" });
  // try {
  //   console.log("request", req.body.username, req.body.password);
  // const user = await UserModel.create({
  // username: req?.body?.username,
  // password: bcrypt.hashSync(req.body.password, 8),
  // });
  UserModel.create({
    username: req?.body?.username,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      console.log(user);
      res.status(200).send({ message: "USER REGISTERED" });
    })
    .catch((error) => {
      // Handle the promise rejection
      console.error(error);
    });
  //   if (user) {
  //     res.send({ message: "USER REGISTERED" });
  //   }
  // } catch (error) {
  //   // Handle the error
  //   console.error(error);
  // }
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
        username: user.username,
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
