import dotenv from 'dotenv'

dotenv.config()

interface Config {
  port: number
  startDate: string
  endDate: string
  nasaMeteorUrl: string
  nasaRoverUrl: string
  sol: number
}

const config: Config = {
  port: parseInt(process.env.APP_PORT || '4000'),
  startDate: process.env.START_DATE || '2024-10-10',
  endDate: process.env.END_DATE || '2024-10-11',
  nasaMeteorUrl: `${process.env.NASA_API_URL}?api_key=${process.env.NASA_API_KEY}`,
  nasaRoverUrl: process.env.NASA_ROVER_API_URL || '',
  sol: parseInt(process.env.SOL || '1000')
}

export default config
