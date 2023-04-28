import { Handler, NextFunction, Request, Response } from "express";
import user from "../../database/model/user";

export const getUser: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const username = req.query.username;
    const currentPage = req.query.currentPage as string;
    const usersHaveName = await user
      .query()
      .where(
        user.raw("LOWER(name)"),
        "like",
        `%${username?.toString().toLowerCase()}%`)
        // .andWhere()
      .orderBy("name")
      .page(parseInt(currentPage), 15);
    return res.status(200).json(usersHaveName);
  } catch (error) {
    next(error);
  }
};
