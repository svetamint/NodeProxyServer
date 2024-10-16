import { Request, Response, NextFunction, Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import MeteorMapper from '../use_cases/MeteorMapper'
import Exception from '../exception/Exception'
import RoverMapper from '../use_cases/RoverMapper'
import {
  imageRequestSchema,
  meteorQuerySchema
} from '../../src/middleware/schemas'
import Validator from '../validation/Validator'
import { MeteorQuery } from '../../src/meteor/dto/meteor-query'
import { MeteorResponse } from '../../src/meteor/dto/meteor-response'
import { ImageRequest } from '../models/imageRequest'
import { DateRange } from '../models/DateRange'

class MeteorController {
  private readonly router: Router
  private meteorValidator: Validator
  private imageValidator: Validator

  constructor() {
    this.router = Router()
    this.meteorValidator = new Validator(meteorQuerySchema)
    this.imageValidator = new Validator(imageRequestSchema)
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get('/meteors', this.meteorValidator.validate, this.getMeteors)
    this.router.get('/form', this.getForm)
    this.router.post('/image', this.imageValidator.validate, this.getImage)
  }

  private getMeteors = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const meteorQuery: MeteorQuery = request.query
      const dateRange: DateRange = DateRange.createFromDate(meteorQuery.date)
      const meteorDto: MeteorResponse = await MeteorMapper.getMeteorDto(
        dateRange.startDate,
        dateRange.endDate,
        meteorQuery.wereDangerousMeteors,
        meteorQuery.count
      )
      response.render('meteors.njk', meteorDto)
    } catch (error) {
      if (error instanceof Exception) {
        next(
          new Exception(
            error.code,
            `Failed to get the meteor data due to: ${error.message}`
          )
        )
      } else {
        next(
          new Exception(
            StatusCodes.INTERNAL_SERVER_ERROR,
            'An unknown error occurred'
          )
        )
      }
    }
  }

  private getForm = (request: Request, response: Response) => {
    response.render('form.njk')
  }

  private getImage = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const imageRequest: ImageRequest = request.body
      const photo = await RoverMapper.getLatestPhoto(imageRequest.userApiKey)
      return response.render('photo.njk', {
        userId: imageRequest.userId,
        userName: imageRequest.userName,
        photoUrl: photo
      })
    } catch (error) {
      if (error instanceof Exception) {
        next(
          new Exception(
            error.code,
            `Failed to get the latest from rover due to: ${error.message}`
          )
        )
      } else {
        next(
          new Exception(
            StatusCodes.INTERNAL_SERVER_ERROR,
            'An unknown error occurred'
          )
        )
      }
    }
  }

  public getRouter() {
    return this.router
  }
}

export default new MeteorController().getRouter()
