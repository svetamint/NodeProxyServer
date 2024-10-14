import express from 'express'
import { StatusCodes } from 'http-status-codes';
import getMeteorDto from '../use_cases/meteorMapper.js'
import config from "../config/config.js";
import Exception from "../exception/Exception.js";
import getLatestPhoto from "../use_cases/roverMapper.js"
import {imageRequestSchema, meteorQuerySchema} from "../validation/schemas.js"
import validate from "../validation/validator.js";

const meteorRouter = express.Router()

const getDateRange = (date) => {
    if (date) {
        return {startDate: date, endDate: date};
    }
    return { startDate: config.startDate, endDate: config.endDate };
};

meteorRouter.get('/meteors', validate(meteorQuerySchema), async (request, response, next) => {
    try {
        const { date, count, wereDangerousMeteors } = request.query;
        const { startDate, endDate } = getDateRange(date)
        const meteorDto = await getMeteorDto(startDate, endDate, Boolean(wereDangerousMeteors), Boolean(count));
        response.render('meteors.njk', meteorDto);
    } catch (error) {
        next(new Exception(StatusCodes.INTERNAL_SERVER_ERROR, `Failed to get meteors info due to: ${error.message}`));
    }
});

meteorRouter.get('/form', (request, response) => {
    response.render('form.njk');
});

meteorRouter.post('/image', validate(imageRequestSchema), async (request, response, next) => {
    try {
        const { userId, userName, userApiKey } = request.body;
        const photo = await getLatestPhoto(userApiKey);
        return response.render('photo.njk', {
            userId: Number(userId),
            userName,
            photoUrl: photo
        })
    } catch (error) {
        next(new Exception(StatusCodes.INTERNAL_SERVER_ERROR, `Failed to get the latest from rover due to: ${error.message}`))
    }
})

export default meteorRouter;