import { NextFunction, Request, RequestHandler, Response } from "express";
import user from "../../database/model/user";
import bcrypt from "bcrypt";
import { signToken } from "../../util/signToken";
import { authResponse } from "../../types/authResponse";
import _ from "lodash";
import "dotenv/config";



export const login: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    let account = await user.query().findOne("email", email);

    // check if email not exsist
    if (!account) return res.status(400).send("email not exsist");

    const isCorrectPassword = await bcrypt.compare(password, account.password);

    if (!isCorrectPassword)
      return res.status(400).send("incorrect email or password");

    let userInfo : authResponse = _.omit(account,['password', 'admin'])
    userInfo.token = signToken(account);


    return res.status(200).json(userInfo);
  } catch (error) {
    next(error);
  }
};
