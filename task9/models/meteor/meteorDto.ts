export interface MeteorDto {
  id: string
  name: string
  diameter: number | null
  is_potentially_hazardous_asteroid: boolean
  close_approach_date_full: string | null
  relative_velocity: string | null
}
