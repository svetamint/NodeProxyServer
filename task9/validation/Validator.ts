import { Request, Response, NextFunction } from 'express'
import { ObjectSchema } from 'joi'
import { StatusCodes } from 'http-status-codes'
import Exception from '../exception/Exception'

class Validator {
  private schema: ObjectSchema

  constructor(schema: ObjectSchema) {
    this.schema = schema
  }

  public validate = (
    request: Request,
    response: Response,
    next: NextFunction
  ): void => {
    const dataToValidate =
      Object.keys(request.body).length > 0 ? request.body : request.query

    const { error } = this.schema.validate(dataToValidate, {
      abortEarly: false
    })

    if (error) {
      const errorMessages = error.details.map((err) => err.message).join(',')
      throw new Exception(StatusCodes.BAD_REQUEST, errorMessages)
    }
    next()
  }
}

export default Validator
