import axios from 'axios';

import { config } from "../config/config.js";

export const getMeteorData = async(startDate, endDate) => {
    try {
        const nasaUrl = `${config.nasaMeteorUrl}&start_date=${startDate}&end_date=${endDate}`;
        const response = await axios.get(nasaUrl);
        return response.data.near_earth_objects;
    } catch (error) {
        throw new Error(error.message);
    }
}