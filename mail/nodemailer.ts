"use strict";
import nodemailer from "nodemailer";
import { Options } from "nodemailer/lib/mailer";

export const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export const mailOptions = {
  from: "Tech Innovation Club <krishnapaulraj2004@gmail.com>",
  text: "This is a test email sent using Nodemailer.",
};

export function sendEmail(option: Options) {
  transporter.sendMail(option, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}
