import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import http from "http";
import Knex from 'knex'
import { Model } from "objection";
import * as config from './database/knexfile'
import authRoute from './Router/authRoute/authRouter'
import manageRouter from "./Router/manage/manageRouter";
import { errorMiddleware } from "./middleware/error";
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors({origin: true}))

// subcribe router
app.use('/auth', authRoute)
app.use('/manage', manageRouter)

// subcribe error handle
app.use(errorMiddleware);

const knex = Knex(config.development)
Model.knex(knex)

const server = http.createServer(app);
server.listen(process.env.SERVER_PORT, () => {
  console.log(`server listening port ${process.env.SERVER_PORT}`);
});
