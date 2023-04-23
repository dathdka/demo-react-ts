import { NextFunction, Request, RequestHandler, Response } from "express";
import user from "../../database/model/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const signToken = (account: user) => {
  return jwt.sign(
    {
      id: account.id,
      email: account.email,
      name: account.name,
      admin: account.admin,
    },
    `${process.env.JWT_SECRETKEY}`,
    {
      expiresIn: "30d",
    }
  );
};

export const login: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const account = await user.query().findOne("email", email);
    // check if email not exsist
    if (!account) return res.status(400).send("email not exsist");

    const isCorrectPassword = await bcrypt.compare(password, account.password);

    if (!isCorrectPassword)
      return res.status(400).send("incorrect email or password");

    const token = signToken(account);
    return res.status(200).json(token);
    
  } catch (error) {
    next(error);
  }
};
