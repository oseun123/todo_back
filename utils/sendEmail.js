"use strict";
const nodemailer = require("nodemailer");
require("dotenv").config();

const { MAIL_USER, MAIL_PASS } = process.env;

async function sendEmail(to, from, subject, body) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: "oseun04@gmail.com",
      pass: "oluwaseun91",
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: from, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    // text: "Hello world?", // plain text body
    html: body, // html body
  });
  return info;
  //   console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// main().catch(console.error);
module.exports = sendEmail;
