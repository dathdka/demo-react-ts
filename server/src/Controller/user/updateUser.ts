import { NextFunction, Request, RequestHandler, Response } from "express";
import user from "../../database/model/user";
import { Model } from "objection";
export const updateUser: RequestHandler = async (
  req: Request,
  res: Response,
  next : NextFunction
) => {
  try {
    const updateUser: user = req.body;
    
    await user.query().findById(updateUser.id).patch(updateUser).forUpdate()
    return res.status(200).send("update user successfully");
    
  } catch (error) {
    next(error)
  }
};
