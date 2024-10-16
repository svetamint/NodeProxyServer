import { MeteorResponse } from './dto/meteor-response'

interface IMeteorMapper {
  toDto: (
    startDate: string,
    endDate: string,
    wereDangerousMeteors?: boolean,
    count?: boolean
  ) => Promise<MeteorResponse>
}

export { IMeteorMapper }
