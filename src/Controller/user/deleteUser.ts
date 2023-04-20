import { Request, RequestHandler, Response } from "express";
import user from "../../database/model/user";

export const deleteUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { deleteUserId } = req.body;
  await user.query().deleteById(deleteUserId);
  return res.status(200).send("delete successfully");
};
