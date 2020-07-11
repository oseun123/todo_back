const models = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;
const { User } = models;

exports.authorizeMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({
      status: "error",
      message: "Unauthorized",
      payload: {},
    });
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, JWT_SECRET, { expiresIn: "24h" }, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        status: "error",
        message: "Unauthorized",
        payload: {},
      });
    }
    req.decoded = decoded;
    // console.log(decoded);

    User.findByPk(decoded.id).then((user) => {
      if (!user) {
        return res.status(401).send({
          status: "error",
          message: "User does not exist",
          payload: {},
        });
      }
    });
  });
  next();
};
