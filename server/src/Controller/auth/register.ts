import { RequestHandler, Request, Response, NextFunction } from "express";
import { v4 } from "uuid";
import bcrypt from "bcrypt";
import user from "../../database/model/user";
import { authResponse } from "../../types/authResponse";
import { signToken } from "../../util/signToken";
import _ from 'lodash'
const prepareData = async (userInfo : user) => {
  userInfo.id = v4();
  userInfo.admin = userInfo.admin ? true : false
  userInfo.password = await bcrypt.hash(userInfo.password, 5);
  return userInfo
} 

export const register: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let userInfo: user = req.body;
    const isExsist = await user.query().findOne("email", userInfo.email);
    if (isExsist) return res.status(400).send("email already exsist");
  
    userInfo = await prepareData(userInfo)
    
    await user.query().insert(userInfo);

    let userRegister : authResponse = _.omit(userInfo,['password', 'admin'])
    userRegister.token = signToken(userInfo);

    return res.status(201).send("register successfully");
    
  } catch (error) {
    next(error)
  }

};
