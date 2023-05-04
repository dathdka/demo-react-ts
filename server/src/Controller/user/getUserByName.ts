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
    const isAdmin = req.query.isAdmin as string;
    const addressKey = req.query.addressKey;
    const isAsc = req.query.isAsc
    let adminCheck =
      isAdmin === "true" ? true : isAdmin === "false" ? false : null;

    const sortBy = isAsc === 'false' ? 'desc' :'asc' 
    

    const usersHaveName = await user
      .query()
      .where(
        user.raw("LOWER(name)"),
        "like",
        `%${username?.toString().toLowerCase()}%`
      )
      //filter by role
      .andWhere((builder) => {
        if (adminCheck === true || adminCheck === false)
          builder.andWhere("admin", adminCheck);
      })
      //filter by address
      .andWhere(
        user.raw("LOWER(address)"),
        "like",
        `%${addressKey?.toString().toLowerCase()}%`
      )
      .orderBy("name",sortBy)
      .page(parseInt(currentPage), 15);
    return res.status(200).json(usersHaveName);
  } catch (error) {
    next(error);
  }
};
