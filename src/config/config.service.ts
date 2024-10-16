import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv'
import 'dotenv/config'
import { injectable } from 'inversify'
import { IConfigService } from './config.service.interface'

@injectable()
class ConfigService implements IConfigService {
  private readonly config: DotenvParseOutput = {}
  constructor() {
    const result: DotenvConfigOutput = config()
    if (result.error) {
      console.error(
        '[ConfigService] The .env file could not be read or is missing'
      )
    } else {
      console.log('[ConfigService]: .env file loaded')
      this.config = result.parsed as DotenvParseOutput
    }
  }

  get(key: string): string {
    return this.config[key]
  }
}

export { ConfigService }
