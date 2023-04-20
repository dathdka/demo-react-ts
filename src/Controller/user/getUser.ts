import { Handler, Request, Response } from "express";
import user from '../../database/model/user'

export const getUser : Handler = async (req: Request, res: Response) =>{
    const {username} = req.params
    // const usersHaveName = await user.raw("SELECT * FROM users WHERE ")
}