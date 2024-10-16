import { MeteorDto } from './meteor-dto'

export interface MeteorResponse {
  meteorData: MeteorDto[]
  wereDangerousMeteors?: boolean
  count?: number
}
