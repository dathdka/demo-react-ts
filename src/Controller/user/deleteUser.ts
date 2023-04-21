import { Request, RequestHandler, Response } from "express";
import user from "../../database/model/user";

export const deleteUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.body;
    await user.query().deleteById(id);
    return res.status(200).send("delete successfully");
    
  } catch (error) {
    console.log(error);
    res.status(500).send('something went wrong, please try again later')
  }
};
