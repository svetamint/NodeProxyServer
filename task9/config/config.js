import dotenv from 'dotenv'

dotenv.config()

export const config = {
    port: process.env.APP_PORT || 4000,
    startDate: process.env.START_DATE,
    endDate: process.env.END_DATE,
    nasaMeteorUrl: `${process.env.NASA_API_URL}?api_key=${process.env.NASA_API_KEY}`,
    nasaRoverUrl: process.env.NASA_ROVER_API_URL,
    sol: process.env.SOL
}