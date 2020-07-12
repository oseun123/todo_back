const models = require("../models");
const sendEmail = require("../utils/sendEmail");
const {
  createToken,
  verifyToken,
  hashPassword,
  comparePassword,
} = require("../utils");
const { User } = models;

exports.signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    // console.log(user);
    if (user) {
      return res.status(400).send({
        status: "error",
        message: "Email already exist",
        payload: {},
      });
    }
    const hash = hashPassword(password);
    const signUpUser = await User.create({
      name,
      email,
      password: hash,
    });
    const token = createToken(signUpUser);
    const { id } = signUpUser;
    return res.status(201).send({
      status: "success",
      message: "Sign up successfully",
      payload: { token, user: { id, name, email } },
    });
  } catch (error) {
    //   return next(new Error(error));
    return res.status(400).send({
      status: "error",
      message: error.message,
      payload: {},
    });
  }
};
exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (user && comparePassword(password, user.password)) {
      const token = createToken(user);
      return res.status(200).send({
        status: "success",
        message: "Logged in successfully",
        payload: { user: { id: user.id, name: user.name, email }, token },
      });
    }
    return res.status(400).send({
      status: "error",
      message: "Invalid email/password combination",
      payload: {},
    });
  } catch (error) {
    return res.status(400).send({
      status: "error",
      message: error.message,
      payload: {},
    });
  }
};

exports.sendResetLink = async (
  { body: { email }, protocol, hostname },
  res,
  next
) => {
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(400).send({
        status: "error",
        message: "Email not found",
        payload: { users: user },
      });
    }
    const token = createToken(user);
    // dev const port =":3000";
    const port = "";

    const link = `${protocol}://${hostname}${port}/reset_password/${token}`;
    const sent = await sendEmail(
      email,
      "noreply@best.dev",
      "Best todo password reset",
      `<div>Click the link below to reset your password</div><br/> 
      <div>${link}</div>
    `
    );
    if (sent) {
      return res.status(200).send({
        status: "success",
        message: "Password reset link has been sent successfully",
        payload: {},
      });
    }
  } catch (error) {
    return res.status(400).send({
      status: "error",
      message: error.message,
      payload: {},
    });
  }
};
exports.resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const { token } = req.params;
    const decoded = verifyToken(token);
    const hash = hashPassword(password);
    const updatedUser = await User.findOne({ where: { id: decoded.id } });
    console.log(updatedUser);
    if (updatedUser) {
      await updatedUser.update({ password: hash });
      return res.status(200).send({
        status: "success",
        message: "Password reset successfully",
        payload: {
          token,
          user: {
            id: updatedUser.id,
            email: updatedUser.email,
            name: updatedUser.name,
          },
        },
      });
    }
  } catch (error) {
    return res.status(400).send({
      status: "error",
      message: error.message,
      payload: {},
    });
  }
};
