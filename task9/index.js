import express from 'express';
import {config} from "./config/config.js";
import meteorRouter from './delivery/meteorController.js'

const app = express();

app.use(meteorRouter)

app.listen(config.port)