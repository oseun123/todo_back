const models = require("../models");
const validator = require("validator");
const { User } = models;

exports.authMiddleware = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!validator.isEmail(email)) {
    return res.status(400).send({
      status: "error",
      message: "invalid email address",
      payload: {},
    });
  }
  if (!email) {
    return res.status(400).send({
      status: "error",
      message: "email is required",
      payload: {},
    });
  }
  if (!name) {
    return res.status(400).send({
      status: "error",
      message: "name is required",
      payload: {},
    });
  }
  if (!password) {
    return res.status(400).send({
      status: "error",
      message: "password is required",
      payload: {},
    });
  }
  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  if (user) {
    return res.status(400).send({
      status: "error",
      message: "User already exsist",
      payload: {},
    });
  }
  next();
};
