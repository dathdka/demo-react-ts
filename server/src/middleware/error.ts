import { NextFunction, Request, Response } from "express";
export const errorMiddleware = (err : Error, req : Request, res : Response, next : NextFunction) => {
    console.error(err.stack);
    return  res.status(500).send('something went wrong, please try again later');
  }