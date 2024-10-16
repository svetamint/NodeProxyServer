import 'reflect-metadata'
import { Container } from 'inversify'
import { App } from './app'
import { TYPES } from './constants/constants'
import { IMeteorController } from './meteor/meteor.controller.interface'
import { MeteorController } from './meteor/meteor-controller'
import { IConfigService } from './config/config.service.interface'
import { ConfigService } from './config/config.service'
import { IExceptionFilter } from './common/exception.filter.interface'
import { ValidateMiddleware } from './middleware/validate.middleware'
import { ExceptionFilter } from './middleware/exception.filter'
import { IMeteorMapper } from './meteor/meteor.mapper.interface'
import { MeteorMapper } from './meteor/meteor.mapper'
import { MeteorClient } from './meteor/meteor.client'
import { IMeteorClient } from './meteor/meteor.client.interface'
import { IValidationSchema } from './middleware/validation.schema.interface'
import { MeteorQuerySchema } from './middleware/meteor-query-schema'

const container = new Container()

container
  .bind<IMeteorController>(TYPES.IMeteorController)
  .to(MeteorController)
  .inSingletonScope()
container
  .bind<IMeteorMapper>(TYPES.IMeteorMapper)
  .to(MeteorMapper)
  .inSingletonScope()
container
  .bind<IMeteorClient>(TYPES.IMeteorClient)
  .to(MeteorClient)
  .inSingletonScope()
container
  .bind<IConfigService>(TYPES.IConfigService)
  .to(ConfigService)
  .inSingletonScope()
container
  .bind<IExceptionFilter>(TYPES.IExceptionFilter)
  .to(ExceptionFilter)
  .inSingletonScope()
container
  .bind<ValidateMiddleware>(TYPES.ValidateMiddleware)
  .to(ValidateMiddleware)
  .inSingletonScope()
container
  .bind<IValidationSchema>(TYPES.IValidationSchema)
  .to(MeteorQuerySchema)
  .inSingletonScope()
container.bind<App>(TYPES.Application).to(App)

const app = container.get<App>(TYPES.Application)
app
  .init()
  .then(() => {
    console.log('App initialized successfully')
  })
  .catch((error) => {
    console.error('Error initializing app:', error)
  })
