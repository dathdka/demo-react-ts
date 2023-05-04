import { NextFunction, Request, RequestHandler, Response } from "express";
import user from "../../database/model/user";
import { omit } from "lodash";

export const updateUser: RequestHandler = async (
  req: Request,
  res: Response,
  next : NextFunction
) => {
  try {
    const updateUser: user = req.body;
  
    await user.query().findById(updateUser.id).patch(updateUser).forUpdate()

    const userJustUpdated = await user.query().findById(updateUser.id)

    return res.status(200).json({result : omit(userJustUpdated, ['password'])});
    
  } catch (error) {
    next(error)
  }
};
