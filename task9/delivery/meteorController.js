import express from 'express'
import { getMeteorDto } from '../use_cases/meteorMapper.js'
import { config } from "../config/config.js";

const meteorRouter = express.Router()

meteorRouter.get('/meteors', async (request, response) => {
    try {
        const { date, count, wereDangerousMeteors } = request.query;
        const { startDate, endDate } = getDateRange(date)
        const meteorDto = await getMeteorDto(startDate, endDate, wereDangerousMeteors, count);
        return response.json(meteorDto);
    } catch (error) {
        return response.status(500).json({ error: `Failed to get meteors info due to: ${error.message}` });
    }
});

const getDateRange = (date) => {
    if (date) {
        return {startDate: date, endDate: date};
    }
    return { startDate: config.startDate, endDate: config.endDate };
};

export default meteorRouter;