import axios from 'axios';

import { config } from "../config/config.js";

export const getPhotos = async (apiKey) => {
    const response = await axios.get(config.nasaRoverUrl, {
        params: {
            api_key: apiKey,
            sol: config.sol
        }
    });
    return response.data.photos;
}