import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

import { IMiddleware } from '../common/middleware.interface'
import Exception from '../common/Exception'
import { inject, injectable } from 'inversify'
import { TYPES } from '../constants/constants'
import { IValidationSchema } from './validation.schema.interface'

@injectable()
class ValidateMiddleware implements IMiddleware {
  constructor(
    @inject(TYPES.IValidationSchema) private schema: IValidationSchema
  ) {}

  execute(req: Request, res: Response, next: NextFunction): void {
    const dataToValidate =
      Object.keys(req.body).length > 0 ? req.body : req.query
    const { error } = this.schema.getSchema().validate(dataToValidate, {
      abortEarly: false
    })
    if (error) {
      const errorMessages = error.details.map((err) => err.message).join(',')
      throw new Exception(StatusCodes.BAD_REQUEST, errorMessages)
    }
    next()
  }
}

export { ValidateMiddleware }
