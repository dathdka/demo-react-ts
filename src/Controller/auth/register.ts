import { RequestHandler, Request, Response } from "express";
import { v4 } from "uuid";
import bcrypt from "bcrypt";
import user from "../../database/model/user";

export const register: RequestHandler = async (req: Request, res: Response) => {
  const userInfo: user = req.body;
  const isExsist = await user.query().findOne("email", userInfo.email);
  if (isExsist) return res.status(402).send("email already exsist");
  userInfo.id = v4();
  userInfo.admin = false;
  userInfo.password = await bcrypt.hash(userInfo.password, 5);
  await user.query().insert(userInfo);
  return res.status(200).send("register successfully");
};
