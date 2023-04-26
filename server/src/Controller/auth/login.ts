import { NextFunction, Request, RequestHandler, Response } from "express";
import user from "../../database/model/user";
import bcrypt from "bcrypt";
import { signToken } from "../../util/signToken";
import { authResponse } from "../../types/authResponse";
import omit from "lodash/omit";
import "dotenv/config";
import { validatePayload } from "../../util/validateData";


export const login: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = validatePayload(JSON.stringify(req.body))
    console.log(JSON.parse(validatedData));
    
    const { email, password } = JSON.parse(validatedData)
    let account = await user.query().findOne("email", email);

    // check if email not exsist
    if (!account) return res.status(400).send("email not exsist");

    const isCorrectPassword = await bcrypt.compare(password, account.password);

    if (!isCorrectPassword)
      return res.status(400).send("incorrect email or password");

    let userInfo : authResponse = omit(account,['password', 'admin'])
    userInfo.token = signToken(account);


    return res.status(200).json(userInfo);
  } catch (error) {
    next(error);
  }
};
