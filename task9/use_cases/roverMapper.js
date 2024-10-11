import { getPhotos} from "../repository/roverClient.js";
import {config} from "../config/config.js";
import Exception from "../exception/Exception.js";
import { StatusCodes } from 'http-status-codes';

export const getLatestPhoto = async (apiKey) => {
    const photos = await getPhotos(apiKey);
    if (photos.length === 0) {
        throw new Exception(StatusCodes.NOT_FOUND, 'No images found for the specified sol')
    }
    return photos.find(photo => photo.sol === config.sol).img_src
}