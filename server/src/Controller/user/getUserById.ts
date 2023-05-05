import { NextFunction, Request, Response } from "express";
import user from '../../database/model/user'
import { omit } from "lodash";
export const getUserById = async (req : Request, res : Response, next : NextFunction) =>{

    try {
        const id = req.query.id
        const userInfo = await user.query().findById(id as string)

        if(!userInfo)
            return res.status(200).send("user not exsist")
        
        
        return res.status(200).json({result : omit(userInfo,['password'])})
    } catch (error) {
        next(error)
    }
}