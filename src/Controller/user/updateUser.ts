import { Request, RequestHandler, Response } from "express";
import user from "../../database/model/user";
export const updateUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const updateUser: user = req.body;
    await user.query().findById(updateUser.id).patch(updateUser)
    return res.status(200).send("update user successfully");
    
  } catch (error) {
    console.log(error);
    res.status(500).send('something went wrong, please try again later')
  }
};
