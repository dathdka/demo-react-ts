import { NextFunction, Request, Response } from "express";
import { decodeToken } from "../util/decodeToken";

export const authMiddleware  = (req: Request, res: Response, next: NextFunction) =>{
    let token : string = req.body.token || req.headers['authorization'] || '' ;
    token = token.replace('Bearer ',"")
    if(!token)
        return res.status(403).send('invalid token')
    const decoded = decodeToken(token)
    if(!decoded)
        return res.status(401).send('Invalid token')
    
    if(!decoded.admin)
        return res.status(403).send("you DO NOT have permission to access this resource")
    
    req.body['decode'] = decoded;
    return next();
}