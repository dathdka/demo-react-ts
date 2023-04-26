import { NextFunction, Request, RequestHandler, Response } from "express";
import { Model } from "objection";
import user from "../../database/model/user";

export const deleteUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.body;
    await user.query().deleteById(id).forUpdate();
    return res.status(200).send("delete successfully");
  } catch (error) {
    next(error);
  }
};
