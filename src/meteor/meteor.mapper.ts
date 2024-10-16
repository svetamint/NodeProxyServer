import { IMeteorMapper } from './meteor.mapper.interface'
import { MeteorResponse } from './dto/meteor-response'
import { inject, injectable } from 'inversify'
import { TYPES } from '../constants/constants'
import { IMeteorClient } from './meteor.client.interface'
import { NearEarthObjects } from './dto/near-earth-objects'
import { MeteorDto } from './dto/meteor-dto'

@injectable()
class MeteorMapper implements IMeteorMapper {
  constructor(
    @inject(TYPES.IMeteorClient) private meteorClient: IMeteorClient
  ) {}

  async toDto(
    startDate: string,
    endDate: string,
    wereDangerousMeteors?: boolean,
    count?: boolean
  ): Promise<MeteorResponse> {
    const meteorData: NearEarthObjects = await this.meteorClient.findAll(
      startDate,
      endDate
    )
    const meteorDtoList: MeteorDto[] = []
    Object.values(meteorData).forEach((value) => {
      value.forEach((asteroid) => {
        meteorDtoList.push({
          id: asteroid.id,
          name: asteroid.name,
          diameter:
            asteroid.estimated_diameter?.meters?.estimated_diameter_max || null,
          is_potentially_hazardous_asteroid:
            asteroid.is_potentially_hazardous_asteroid,
          close_approach_date_full:
            asteroid.close_approach_data?.[0]?.close_approach_date_full || null,
          relative_velocity:
            asteroid.close_approach_data?.[0]?.relative_velocity
              .kilometers_per_second || null
        })
      })
    })

    const responseData: MeteorResponse = { meteorData: meteorDtoList }

    if (wereDangerousMeteors) {
      responseData.wereDangerousMeteors = meteorDtoList.some(
        (meteor) => meteor.is_potentially_hazardous_asteroid
      )
    }

    if (count) {
      responseData.count = meteorDtoList.length
    }
    return responseData
  }
}

export { MeteorMapper }
