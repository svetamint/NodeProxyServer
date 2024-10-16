import { IMeteorClient } from './meteor.client.interface'
import { NearEarthObjects } from './dto/near-earth-objects'
import axios, { AxiosResponse } from 'axios'
import { NearEarthObjectsResponse } from './dto/near-earth-objects-response'
import { inject, injectable } from 'inversify'
import { IConfigService } from '../config/config.service.interface'
import { TYPES } from '../constants/constants'

@injectable()
class MeteorClient implements IMeteorClient {
  constructor(
    @inject(TYPES.IConfigService) private configService: IConfigService
  ) {}

  async findAll(startDate: string, endDate: string): Promise<NearEarthObjects> {
    const nasaUrl = `${this.configService.get('NASA_API_URL')}?api_key=${this.configService.get('NASA_API_KEY')}`
    const response: AxiosResponse<NearEarthObjectsResponse> = await axios.get(
      nasaUrl,
      { params: { start_date: startDate, end_date: endDate } }
    )
    return response.data.near_earth_objects || {}
  }
}

export { MeteorClient }
