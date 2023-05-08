import { text } from "express";
import nodemailer from "nodemailer";

export class EmailService {
  static transporter: nodemailer.Transporter;

  constructor() {
    if (!EmailService.transporter)
      EmailService.transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "916ded08cf8fdd",
          pass: "72de87943ece6d",
        },
      });
  }

  static async sendEmail (email: string, otp : string) {
    await EmailService.transporter.sendMail({
        from: 'ForgetPassword@gmail.com',
        to: email,
        subject : 'Forget password',
        text : `Your reset password OTP: ${otp}`
    })
  }
}
