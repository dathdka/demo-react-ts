import { NextFunction, Request, Response } from "express";
import { decodeToken } from "../util/decodedToken";

export const authMiddleware  = (req: Request, res: Response, next: NextFunction) =>{
    try {
        let token : string = req.body.token || req.headers['authorization'] || '' ;
        token = token.replace('Bearer ',"")
        if(!token)
            return res.status(403).send('invalid token')
        const decoded = decodeToken(token)
        
        if(!decoded.admin)
            return res.status(403).send("you DO NOT have permission to access this resource")
        next()
    } catch (error) {
        return res.status(500).send('something went wrong, please try again later')
    }
}