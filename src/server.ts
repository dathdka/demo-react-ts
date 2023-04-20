import express from "express";
import "dotenv/config";
import http from "http";
import Knex from 'knex'
import { Model } from "objection";
import * as config from './database/knexfile'
import authRoute from './Router/authRoute/authRouter'
const app = express();

app.use(express.json());
app.use('/auth', authRoute)
const knex = Knex(config.development)
Model.knex(knex)

const server = http.createServer(app);
server.listen(process.env.SERVER_PORT, () => {
  console.log(`server listening port ${process.env.SERVER_PORT}`);
});
