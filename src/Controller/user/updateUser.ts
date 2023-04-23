import { NextFunction, Request, RequestHandler, Response } from "express";
import user from "../../database/model/user";
export const updateUser: RequestHandler = async (
  req: Request,
  res: Response,
  next : NextFunction
) => {
  try {
    const updateUser: user = req.body;
    await user.query().findById(updateUser.id).patch(updateUser)
    return res.status(200).send("update user successfully");
    
  } catch (error) {
    next(error)
  }
};
