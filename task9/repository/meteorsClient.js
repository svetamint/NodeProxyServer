import axios from 'axios';

import { config } from "../config/config.js";

export const getMeteorData = async(startDate, endDate) => {
    const response = await axios.get(config.nasaMeteorUrl, {
        params: {
            start_date: startDate,
            end_date: endDate
        }
    });
    return response.data.near_earth_objects;
}