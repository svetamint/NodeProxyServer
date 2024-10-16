/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Express, NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from './constants/constants'
import { IConfigService } from './config/config.service.interface'
import { IMeteorController } from './meteor/meteor.controller.interface'
import { IExceptionFilter } from './common/exception.filter.interface'
import { ValidateMiddleware } from './middleware/validate.middleware'
import nunjucks from 'nunjucks'
import { StatusCodes } from 'http-status-codes'

@injectable()
class App {
  app: Express
  port: number

  constructor(
    @inject(TYPES.IMeteorController)
    private meteorController: IMeteorController,
    @inject(TYPES.IConfigService) private configService: IConfigService,
    @inject(TYPES.IExceptionFilter) private exceptionFilter: IExceptionFilter,
    @inject(TYPES.ValidateMiddleware)
    private validateMiddleware: ValidateMiddleware
  ) {
    this.app = express()
    this.port = parseInt(configService.get('APP_PORT'), 10) || 4000
  }

  configureNunjucks(): void {
    nunjucks.configure('views', {
      autoescape: true,
      express: this.app
    })
  }

  useExceptionFilters(): void {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
    this.app.use('*', (req: Request, res: Response, next: NextFunction) => {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Page not found' })
    })
  }

  useMiddleware(): void {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(this.validateMiddleware.execute.bind(this.validateMiddleware))
  }

  useRoutes(): void {
    this.app.use(this.meteorController.router)
  }

  public async init(): Promise<void> {
    this.useMiddleware()
    this.configureNunjucks()
    this.useRoutes()
    this.useExceptionFilters()
  }
}

export { App }
