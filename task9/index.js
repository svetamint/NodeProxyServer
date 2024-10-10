import express from 'express';
import {config} from "./config/config.js";
import meteorRouter from './delivery/meteorController.js'
import errorHandler from './exception/errorHandler.js';
import nunjucks from 'nunjucks';

const app = express();

app.use(express.json());
app.use(meteorRouter)
app.use(errorHandler)

nunjucks.configure('views', {
    autoescape: true,
    express: app
})


app.listen(config.port)