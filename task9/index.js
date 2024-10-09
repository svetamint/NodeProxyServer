import express from 'express';
import {config} from "./config/config.js";
import meteorRouter from './delivery/meteorController.js'
import errorHandler from './exception/errorHandler.js';

const app = express();

app.use(meteorRouter)
app.use(errorHandler)

app.listen(config.port)