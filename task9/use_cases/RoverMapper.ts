import { StatusCodes } from 'http-status-codes'
import RoverClient from '../repository/RoverClient'
import config from '../config/config'
import Exception from '../exception/Exception'
import { Photo } from '../models/roverData/photo'

class RoverMapper {
  public async getLatestPhoto(apiKey: string): Promise<string> {
    const photos: Photo[] = await RoverClient.getPhotos(apiKey)
    if (photos.length === 0) {
      throw new Exception(
        StatusCodes.NOT_FOUND,
        'No images found for the specified sol'
      )
    }
    const latestPhoto = photos.find((photo) => photo.sol === config.sol)
    return latestPhoto ? latestPhoto.img_src : ''
  }
}
export default new RoverMapper()
