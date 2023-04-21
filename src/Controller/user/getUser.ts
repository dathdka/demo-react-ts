import { Handler, Request, Response } from "express";
import user from "../../database/model/user";

export const getUser: Handler = async (req: Request, res: Response) => {
  try {
    const username = req.query.username;
  
    const usersHaveName = await user
      .query()
      .where("name", "like", `%${username}%`);
    return res.status(200).json(usersHaveName);
    
  } catch (error) {
    console.log(error);
    res.status(500).send('something went wrong, please try again later')
  }
};
