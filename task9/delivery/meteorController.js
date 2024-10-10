import express from 'express'
import { getMeteorDto } from '../use_cases/meteorMapper.js'
import { config } from "../config/config.js";
import Exception from "../exception/Exception.js";
import { getLatestPhoto } from "../use_cases/roverMapper.js"

const meteorRouter = express.Router()

meteorRouter.get('/meteors', async (request, response, next) => {
    try {
        const { date, count, wereDangerousMeteors } = request.query;
        const { startDate, endDate } = getDateRange(date)
        const meteorDto = await getMeteorDto(startDate, endDate, Boolean(wereDangerousMeteors), Boolean(count));
        response.render('meteors.njk', meteorDto);
    } catch (error) {
        next(new Exception(500, `Failed to get meteors info due to: ${error.message}`));
    }
});

meteorRouter.post('/image', async (request, response, next) => {
    try {
        const { userId, userName, userApiKey } = request.body;
        const photo = await getLatestPhoto(userApiKey);
        return response.json({ userId: Number(userId), userName: userName, photoUrl: photo })
    } catch (error) {
        next(new Exception(500, `Failed to get the latest from rover due to: ${error.message}`))
    }
})

const getDateRange = (date) => {
    if (date) {
        return {startDate: date, endDate: date};
    }
    return { startDate: config.startDate, endDate: config.endDate };
};

export default meteorRouter;