import { Handler, Request, Response } from "express";
import user from "../../database/model/user";

export const getUser: Handler = async (req: Request, res: Response) => {
  const username = req.query.username;
  console.log(username);

  const usersHaveName = await user
    .query()
    .where("name", "like", `%${username}%`);
  return res.status(200).json(usersHaveName);
};
