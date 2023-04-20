import { Request, RequestHandler, Response } from "express";
import user from "../../database/model/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const login: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const account = await user.query().findOne("email", email);
    // check if email not exsist
    if (!account) return res.status(401).send("email not exsist");

    const isCorrectPassword = await bcrypt.compare(password, account.password);

    if (!isCorrectPassword)
      return res.status(401).send("incorrect email or password");
    
    const token = await jwt.sign(
      {
        id: account.id,
        email: account.email,
        name: account.name,
        admin: account.admin
      },
      `${process.env.JWT_SECRETKEY}`,
      {
        expiresIn: "30d",
      }
    );

    return res.status(200).json(token);
  } catch (error) {
    console.log(error);
    return res.status(401).send("something went wrong, please try again later");
  }
};
