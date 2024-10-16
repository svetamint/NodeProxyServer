import axios, { AxiosResponse } from 'axios'

import config from '../config/config'
import { NearEarthObjectsResponse } from '../../src/meteor/dto/near-earth-objects-response'
import { NearEarthObjects } from '../../src/meteor/dto/near-earth-objects'

class MeteorClient {
  apiUrl: string

  constructor() {
    this.apiUrl = config.nasaMeteorUrl
  }

  public async getMeteorData(
    startDate: string,
    endDate: string
  ): Promise<NearEarthObjects> {
    const response: AxiosResponse<NearEarthObjectsResponse> = await axios.get(
      config.nasaMeteorUrl,
      {
        params: {
          start_date: startDate,
          end_date: endDate
        }
      }
    )
    return response.data.near_earth_objects || {}
  }
}
export default new MeteorClient()
