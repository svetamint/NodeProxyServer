import { MeteorDto } from './meteorDto'

export interface MeteorResponse {
  meteorData: MeteorDto[]
  wereDangerousMeteors?: boolean
  count?: number
}
