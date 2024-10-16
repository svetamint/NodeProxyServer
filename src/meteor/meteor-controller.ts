import { NextFunction, Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import { StatusCodes } from 'http-status-codes'
import 'reflect-metadata'

import { TYPES } from '../constants/constants'
import { IMeteorController } from './meteor.controller.interface'
import { IMeteorMapper } from './meteor.mapper.interface'
import { MeteorQuery } from './dto/meteor-query'
import { IConfigService } from '../config/config.service.interface'

@injectable()
class MeteorController implements IMeteorController {
  private readonly _router = Router()

  constructor(
    @inject(TYPES.IMeteorMapper) private meteorMapper: IMeteorMapper,
    @inject(TYPES.IConfigService) private configService: IConfigService
  ) {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this._router.get('/meteors', this.findAll.bind(this))
  }

  get router() {
    return this._router
  }

  async findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const meteorQuery: MeteorQuery = req.query
      const result = await this.meteorMapper.toDto(
        meteorQuery.date || this.configService.get('START_DATE'),
        meteorQuery.date || this.configService.get('END_DATE'),
        meteorQuery.wereDangerousMeteors,
        meteorQuery.count
      )
      res.status(StatusCodes.OK).json(result)
    } catch (err) {
      next(err)
    }
  }
}

export { MeteorController }
