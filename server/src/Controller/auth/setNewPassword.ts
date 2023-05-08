import { NextFunction, Request, Response } from "express";
import { RedisCli } from "../../Instance/Redis";
import user from "../../database/model/user";
import bcrypt from "bcrypt";
export const setNewPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { otp, newPassword, email } = req.body;

    const otpForConfirm = await RedisCli.getKey(email);
    if (otp === otpForConfirm) {
      const passwordCrypted = await bcrypt.hash(newPassword, 5);

      await user
        .query()
        .findOne({ email })
        .patch({ password: passwordCrypted })
        .forUpdate();

      await RedisCli.delKey(email);
      return res.status(200).json({success: true})
    }
    return res.status(400).send("incorect OTP or expired already");
  } catch (error) {
    next(error);
  }
};
