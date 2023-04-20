import { Request, RequestHandler, Response } from "express";
import user from "../../database/model/user";
export const updateUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const updateUser: user = req.body;
  await user.query().update(updateUser);
  return res.status(200).send("update user successfully");
};
