import { NearEarthObjects } from './dto/near-earth-objects'

interface IMeteorClient {
  findAll: (startDate: string, endDate: string) => Promise<NearEarthObjects>
}

export { IMeteorClient }
