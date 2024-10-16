import { injectable } from 'inversify'
import { IValidationSchema } from './validation.schema.interface'
import Joi, { ObjectSchema } from 'joi'
import { MeteorQuery } from '../meteor/dto/meteor-query'

@injectable()
class MeteorQuerySchema implements IValidationSchema {
  private readonly schema: ObjectSchema<MeteorQuery>

  constructor() {
    this.schema = Joi.object().keys({
      date: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .optional()
        .messages({
          'string.pattern.base': 'Date must be in the format YYYY-MM-DD'
        }),
      count: Joi.boolean().optional().messages({
        'boolean.base': 'count must be a boolean'
      }),
      wereDangerousMeteors: Joi.boolean().optional().messages({
        'boolean.base': 'wereDangerousMeteors must be a boolean'
      })
    })
  }

  getSchema(): ObjectSchema {
    return this.schema
  }
}

export { MeteorQuerySchema }
