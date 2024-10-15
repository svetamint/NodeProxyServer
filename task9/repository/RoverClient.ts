import axios, { AxiosResponse } from 'axios'

import config from '../config/config'
import { Photo } from '../models/roverData/photo'
import { Photos } from '../models/roverData/photos'

class RoverClient {
  public async getPhotos(apiKey: string): Promise<Photo[]> {
    const response: AxiosResponse<Photos> = await axios.get(
      config.nasaRoverUrl,
      {
        params: {
          api_key: apiKey,
          sol: config.sol
        }
      }
    )
    return response.data.photos
  }
}
export default new RoverClient()
