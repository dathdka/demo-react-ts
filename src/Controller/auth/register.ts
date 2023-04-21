import { RequestHandler, Request, Response } from "express";
import { v4 } from "uuid";
import bcrypt from "bcrypt";
import user from "../../database/model/user";

const prepareData = async (userInfo : user) => {
  userInfo.id = v4();
  userInfo.admin = userInfo.admin ? true : false
  userInfo.password = await bcrypt.hash(userInfo.password, 5);
  return userInfo
} 

export const register: RequestHandler = async (req: Request, res: Response) => {
  try {
    let userInfo: user = req.body;
    const isExsist = await user.query().findOne("email", userInfo.email);
    if (isExsist) return res.status(402).send("email already exsist");
  
    userInfo = await prepareData(userInfo)
  
    await user.query().insert(userInfo);
    return res.status(200).send("register successfully");
    
  } catch (error) {
    console.log(error);
    res.status(500).send('something went wrong, please try again later')
  }

};
