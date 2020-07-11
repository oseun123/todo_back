const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;

const createToken = ({ id, email }) => {
  return jwt.sign({ id, email }, JWT_SECRET, { expiresIn: "24h" });
};

const verifyToken = (token) => {
  const decoded = jwt.verify(token, JWT_SECRET, { expiresIn: "24h" });
  return decoded;
};

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};
const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = { createToken, verifyToken, hashPassword, comparePassword };
